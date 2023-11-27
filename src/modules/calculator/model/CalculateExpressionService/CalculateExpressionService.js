import {Numbers, Symbols} from "UserConfig/constants/constants.js";
import {Regex} from "../constants/regex.js";
import {Operations} from "UserConfig/constants/operations.js";
import {stringIsNumber} from "../utils/stringIsNumber.js";
import {toNumberArray} from "../utils/toNumberArray.js";
import {OperationQueueInitializer} from "../helpers/OperationQueueInitializer/OperationQueueInitializer.js";
import {operationsConfig} from "UserConfig/index.js";
import {CalculationErrorCodes} from "../constants/errorCodes.js";
import {CalculationErrors} from "../constants/errors.js";
import {getInnermostExpressionRegex, INNERMOST_EXPRESSION_GROUP} from "../utils/createRegex/getInnermostExpressionRegex.js";
import {applyPureExpressionAdapter} from "../utils/adapter/applyPureExpressionAdapter.js";
import {CalculationError} from "../helpers/CalculationError.js";
import {compose} from "../../shared/utils/composeFunctions.js";
import {removeSpaces} from "../../controller/utils/prepareExpression/removeSpaces.js";
import {toLowerCase} from "../../controller/utils/prepareExpression/toLowerCase.js";
import {parenthesize} from "../utils/parenthesize.js";
import {Observable} from "../helpers/Observable.js";
import {CalculationEvents} from "../../shared/constants.js";
import {resolveNumberAliases} from "../../controller/utils/prepareExpression/resolveNumberAliases.js";
import {createMemoRegex} from "../utils/createMemoRegex.js";
import {getFirstMatch} from "../../shared/utils/regexUtils/getFirstMatch.js";
import {testConfig} from "../../shared/tests/mocks/testConfig.js";

export class CalculateExpressionService extends Observable {
    constructor(operationsConfig) {
        super();
        this.operationQueue = OperationQueueInitializer.getInstance().init(operationsConfig);
    }

    calculate(expression) {
        // Check if the expression is empty and return undefined if it is,
        // indicating the absence of expression we can calculate
        if(expression == null || expression === "") return undefined;
        try {
            return this.#computeExpression(expression);
        } catch (e) {
            return e instanceof CalculationError ? e : new CalculationError();
        }
    }

    #computeExpression(expression) {
        const innermostNestingRegex = createMemoRegex(getInnermostExpressionRegex(this.operationQueue));

        const processInnermostExpression = (currentExpression) => {
            const innermostNesting = getFirstMatch(innermostNestingRegex, currentExpression, INNERMOST_EXPRESSION_GROUP);

            if (innermostNesting != null) {
                const operationResult = this.#computeInnermostExpression(innermostNesting);
                const newExpression = currentExpression.replace(parenthesize(innermostNesting), operationResult);
                return processInnermostExpression(newExpression);
            }
            return this.#computeInnermostExpression(currentExpression);
        };

        return processInnermostExpression(expression);
    }


    #computeInnermostExpression(expression) {
        let currentExpression = applyPureExpressionAdapter(expression, this.operationQueue);
        if (stringIsNumber(currentExpression)) return currentExpression;

        for (const operationCategory of this.operationQueue) {
            currentExpression = this.#calculateExpressionForOperationCategory(currentExpression, operationCategory);
            if(stringIsNumber(currentExpression)) return currentExpression;
        }

        throw new CalculationError();
    }

    #calculateExpressionForOperationCategory(expression, operationCategory) {
        const operationDetails = operationCategory.extractOperationDetails(expression);
        if(operationDetails == null) return expression;

        const { operationBody, operatorSign, operands, calculateExpression } = operationDetails;
        const calculatedOperands = operands.map(expr => this.#computeInnermostExpression(expr));
        const operationResult = calculateExpression(...toNumberArray(calculatedOperands));
        this.#throwIfError(operationResult);

        const newExpression = expression.replace(operationBody, operationResult);
        return this.#calculateExpressionForOperationCategory(newExpression, operationCategory);
    }

    #throwIfError(operationResult) {
        if(operationResult.errors != null) {
            throw new CalculationError(operationResult.errors);
        }
    }
}
