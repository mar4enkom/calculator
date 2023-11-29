import {Numbers, Symbols} from "UserConfig/constants/constants.js";
import {Regex} from "./constants/regex.js";
import {Operations} from "UserConfig/constants/operations.js";
import {stringIsNumber} from "./utils/stringIsNumber.js";
import {toNumberArray} from "./utils/toNumberArray.js";
import {OperationsConfigProcessor} from "./helpers/OperationsConfigProcessor/OperationsConfigProcessor.js";
import {operationsConfig} from "UserConfig/index.js";
import {CalculationErrorCodes} from "./constants/errorCodes.js";
import {CalculationErrors} from "./constants/errors.js";
import { getInnermostExpressionRegex, InnermostExpressionGroups} from "./utils/createRegex/getInnermostExpressionRegex.js";
import {CalculationError} from "./helpers/CalculationError.js";
import {compose} from "../../shared/utils/composeFunctions.js";
import {removeSpaces} from "../../controller/utils/prepareExpression/removeSpaces.js";
import {toLowerCase} from "../../controller/utils/prepareExpression/toLowerCase.js";
import {parenthesize} from "./utils/parenthesize.js";
import {Observable} from "../../model/helpers/Observable.js";
import {CalculationEvents} from "../../shared/constants/constants.js";
import {resolveNumberAliases} from "../../controller/utils/prepareExpression/resolveNumberAliases.js";
import {createMemoRegex} from "./utils/createMemoRegex.js";
import {getFirstMatch} from "../../shared/utils/regexUtils/getFirstMatch.js";
import {testConfig} from "../../shared/tests/mocks/testConfig.js";
import {ExpressionAdapter} from "./helpers/ExpressionAdapter/ExpressionAdapter.js";
import {getValidationErrors} from "../../shared/utils/getValidationErrors.js";
import {InitialValidationsProvider} from "./helpers/InitialValidationsProvider/InitialValidationsProvider.js";

export class CalculateExpressionService {
    constructor(operationsConfig) {
        this.prioritizedOperations = OperationsConfigProcessor.process(operationsConfig);
    }

    calculate(expression) {
        // Check if the expression is empty and return undefined if it is,
        // indicating the absence of expression we can calculate
        if(expression == null || expression === "") return { result: undefined };

        const adaptedExpression = ExpressionAdapter.adaptExpression(expression, this.prioritizedOperations);
        const validationList = InitialValidationsProvider.validations;
        const validationErrors = getValidationErrors(adaptedExpression, ...validationList);
        if(validationErrors.length > 0) return new CalculationError(validationErrors);

        try {
            const result = this.#computeExpression(adaptedExpression);
            return { result };
        } catch (e) {
            return e instanceof CalculationError ? e : new CalculationError();
        }
    }

    #computeExpression(expression) {
        const innermostNestingRegex = createMemoRegex(getInnermostExpressionRegex(this.prioritizedOperations));

        let currentExpression = expression;
        while (true) {
            const matchedNesting = getFirstMatch(innermostNestingRegex, currentExpression, InnermostExpressionGroups.INNERMOST_EXPRESSION);
            if(matchedNesting == null) break;
            const operationResult = this.#computeExpressionWithoutParentheses(matchedNesting);
            currentExpression = currentExpression.replace(parenthesize(matchedNesting), operationResult);
        }
        return this.#computeExpressionWithoutParentheses(currentExpression);
    }


    #computeExpressionWithoutParentheses(expression) {
        if (stringIsNumber(expression)) return expression;

        let currentExpression = expression;
        for (const operationCategory of this.prioritizedOperations) {
            currentExpression = this.#calculateExpressionForOperationCategory(currentExpression, operationCategory);
            if(stringIsNumber(currentExpression)) return currentExpression;
        }
        // If we have iterated through all categories and the result is not a number,
        // throw a CalculationError indicating an error in the input expression
        throw new CalculationError();
    }

    #calculateExpressionForOperationCategory(expression, operationCategory) {
        const operationDetails = operationCategory.extractOperationDetails(expression);
        if(operationDetails == null) return expression;

        const { operationBody, operands, calculateExpression } = operationDetails;
        const calculatedOperands = operands.map(expr => this.#computeExpressionWithoutParentheses(expr));
        const operationResult = calculateExpression(...toNumberArray(calculatedOperands));

        const newExpression = expression.replace(operationBody, operationResult);
        return this.#calculateExpressionForOperationCategory(newExpression, operationCategory);
    }
}
