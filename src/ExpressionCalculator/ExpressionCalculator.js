import {Digits, Symbols} from "UserConfig/constants/constants.js";
import {Regex} from "CalculatorService/constants/regex.js";
import {Operations} from "UserConfig/constants/operations.js";
import {stringIsNumber} from "CalculatorService/utils/stringIsNumber.js";
import {toNumberArray} from "CalculatorService/utils/toNumberArray.js";
import {operationsConfig} from "UserConfig/index.js";
import {CalculationErrorCodes} from "CalculatorService/constants/errorCodes.js";
import {CalculationErrors} from "CalculatorService/constants/errors.js";
import { getInnermostExpressionRegex, InnermostExpressionGroups} from "CalculatorService/utils/createRegex/getInnermostExpressionRegex.js";
import {CalculationError} from "CalculatorService/helpers/CalculationError.js";
import {removeSpaces} from "CalculatorService/utils/removeSpaces.js";
import {toLowerCase} from "CalculatorService/utils/toLowerCase.js";
import {parenthesize} from "CalculatorService/utils/parenthesize.js";
import {createMemoRegex} from "CalculatorService/utils/createMemoRegex.js";
import {transformExpression} from "CalculatorService/utils/adaptExpression/transformExpression.js";
import {initialValidations} from "CalculatorService/utils/initialValidations/index.js";
import {processConfig} from "CalculatorService/utils/processConfig/processConfig.js";
import {getValidationErrors} from "Shared/utils/getValidationErrors.js";
import {getFirstMatch} from "Shared/utils/regexUtils/getFirstMatch.js";

export class ExpressionCalculator {
    constructor(operationsConfig) {
        this.prioritizedOperations = processConfig(operationsConfig);
    }

    calculate(expression) {
        // Check if the expression is empty and return undefined if it is,
        // indicating the absence of expression we can calculate
        if(this.#isEmptyInput(expression)) return { result: undefined };

        const transformedExpression = transformExpression(expression, this.prioritizedOperations);
        const validationErrors = getValidationErrors(transformedExpression, ...initialValidations);
        if(validationErrors.length > 0) return { errors: validationErrors };

        try {
            const result = this.#computeExpression(transformedExpression);
            return { result };
        } catch (e) {
            return e instanceof CalculationError
                ? { errors: e.errors }
                : { errors: CalculationErrors[CalculationErrorCodes.UNKNOWN_ERROR] }
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

    #isEmptyInput(arg) {
        return arg == null || arg === "";
    }
}
