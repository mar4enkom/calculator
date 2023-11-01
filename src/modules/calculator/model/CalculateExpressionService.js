import {ValidationService} from "../controller/ValidationService.js";
import {getValidationErrors} from "../../../utils/getValidationErrors.js";
import {removeSpaces} from "../../../utils/removeSpaces.js";
import {Symbols} from "../../../constants/constants.js";
import {Regex} from "../../../constants/regex.js";
import {Operations} from "../../../constants/operations.js";
import {stringIsNumber} from "../../../utils/stringIsNumber.js";
import {toNumberArray} from "../../../utils/toNumberArray.js";
import {OperationQueueInitializer} from "./configInitializer/OperationQueueInitializer.js";
import {Observable} from "./Observable.js";
import {safeRegexSymbol} from "../../../utils/safetyRegexSymbol.js";
import {operationsConfig} from "../../../../userConfig/operations/index.js";
import {PureExpressionDecorator} from "./PureExpressionDecorator.js";

export const ObservableType = {
    VALIDATION_ERROR: "error",
    CALCULATION_RESULT: "result",
}

const INVALID_EXPRESSION_INPUT_ERROR = "Invalid expression input";

/**
 * The CalculateExpressionService class provides a service for calculating mathematical expressions
 * using a predefined set of operations.
 *
 * @extends Observable
 */
export class CalculateExpressionService extends Observable {
    /**
     * Create an instance of CalculateExpressionService.
     *
     * @param {Object} operationsConfig - The configuration for mathematical operations.
     */
    constructor(operationsConfig) {
        super();

        /**
         * The operation queue that defines the order and rules for performing operations.
         * @type {OperationCategory[]}
         */
        this.operationQueue = OperationQueueInitializer.getInstance().init(operationsConfig);

        /**
         * The decorator responsible for adopting expression aliases for expression
         * that is understood for the model. Like 5! -> !(5)
         * @type {PureExpressionDecorator}
         */
        this.pureExpressionDecorator = new PureExpressionDecorator(this.operationQueue);
    }

    /**
     * Calculate a mathematical expression and notify the result or validation errors.
     *
     * @param {string} expression - The mathematical expression to calculate.
     */
    calculate(expression) {
        try {
            const calculationResult = this.#calculateExpression(expression);
            const validationResultErrors = this.#getValidationResultErrors(calculationResult);
            if (validationResultErrors != null) return this.notify(ObservableType.VALIDATION_ERROR, validationResultErrors);
            this.notify(ObservableType.CALCULATION_RESULT, calculationResult);
        } catch (e) {
            this.notify(ObservableType.VALIDATION_ERROR, [INVALID_EXPRESSION_INPUT_ERROR]);
        }
    }

    /**
     * Calculate a mathematical expression, handling nested parentheses and applying operations.
     *
     * @private
     * @param {string} expression - The mathematical expression to calculate.
     * @returns {number|string} - The calculated result or an error message.
     */
    #calculateExpression(expression) {
        let currentExpression = expression;
        let matchedParenthesesExpression;
        while ((matchedParenthesesExpression = Regex.LARGEST_NESTING.exec(currentExpression)?.[0]) != null) {
            const innerMatchedParenthesesExpression = matchedParenthesesExpression.slice(1, matchedParenthesesExpression.length - 1);
            const operationResult = this.#calculatePureExpression(innerMatchedParenthesesExpression);
            if (operationResult?.errors?.length > 0) return operationResult;
            currentExpression = currentExpression.replace(matchedParenthesesExpression, operationResult);
        }
        return this.#calculatePureExpression(currentExpression);
    }

    /**
     * Calculate a pure mathematical expression without parentheses.
     *
     * @private
     * @param {string} expression - The mathematical expression to calculate.
     * @returns {number|string} - The calculated result or an error message.
     */
    #calculatePureExpression(expression) {
        let result = expression;

        if (stringIsNumber(result)) return result;
        for (const operationCategory of this.operationQueue) {
            result = this.pureExpressionDecorator.apply(result);
            while (operationCategory.extractOperationBody(result) != null) {
                const operationBody = operationCategory.extractOperationBody(result);
                const operatorSign = operationCategory.extractOperationSign(operationBody);
                const operands = operationCategory
                    .extractOperands(operatorSign, operationBody)
                    .map(expr => this.#calculatePureExpression(expr));
                const operatorProps = operationCategory.operations.find(el => el.sign === operatorSign);
                const operationResult = operatorProps.calc(...toNumberArray(operands));
                if (operationResult?.errors?.length > 0) return operationResult;
                result = result.replace(operationBody, operationResult);
                if (stringIsNumber(result)) return result;
            }
        }
    }

    /**
     * Get validation result errors for the calculated expression.
     *
     * @private
     * @param {number|string} calculationResult - The result of the calculation.
     * @returns {string[]|null} - An array of validation errors or null if the result is valid.
     */
    #getValidationResultErrors(calculationResult) {
        const invalidCalculationResult = calculationResult == null || Number.isNaN(calculationResult);
        return invalidCalculationResult
            ? [INVALID_EXPRESSION_INPUT_ERROR]
            : calculationResult?.errors;
    }
}