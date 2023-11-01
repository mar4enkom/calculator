import {ValidationService} from "../controller/ValidationService.js";
import {getValidationErrors} from "../../../utils/getValidationErrors.js";
import {removeSpaces} from "../../../utils/removeSpaces.js";
import {Symbols} from "../../../constants/constants.js";
import {Regex} from "../../../constants/regex.js";
import {operationsConfig} from "../../../../userConfig/operations/index.js";
import {Operations} from "../../../../userConfig/operations/constants.js";
import {stringIsNumber} from "../../../utils/stringIsNumber.js";
import {toNumberArray} from "../../../utils/toNumberArray.js";
import {ConfigInitializer} from "../configInitializer/ConfigInitializer.js";
import {Observable} from "./Observable.js";
import {Config} from "../configInitializer/Config.js";

export const ObservableType = {
    VALIDATION_ERROR: "error",
    CALCULATION_RESULT: "result",
}

const INVALID_EXPRESSION_INPUT_ERROR = "Invalid expression input";

export class CalculateExpressionService extends Observable {
    constructor(config) {
        super();
        this.config = config;
    }
    calculate(expression) {
        try {
            const calculationResult = this.#calculateExpression(expression);
            const validationResultErrors = this.#getValidationResultErrors(calculationResult);
            if(validationResultErrors != null) return this.notify(ObservableType.VALIDATION_ERROR, validationResultErrors);
            this.notify(ObservableType.CALCULATION_RESULT, calculationResult)
        } catch (e) {
            this.notify(ObservableType.VALIDATION_ERROR, [INVALID_EXPRESSION_INPUT_ERROR])
        }
    }

    #calculateExpression(expression) {
        let currentExpression = expression;
        let matchedParenthesesExpression;
        while((matchedParenthesesExpression = Regex.LARGEST_NESTING.exec(currentExpression)?.[0]) != null) {
            const innerMatchedParenthesesExpression = matchedParenthesesExpression.slice(1, matchedParenthesesExpression.length-1);
            const operationResult = this.#calculatePureExpression(innerMatchedParenthesesExpression);
            if(operationResult?.errors?.length > 0) return operationResult;
            currentExpression = currentExpression.replace(matchedParenthesesExpression, operationResult);
        }
        return this.#calculatePureExpression(currentExpression);
    }

    #calculatePureExpression(expression) {
        const operationQueue = this.#getOperationQueue();
        let result = expression;

        if(stringIsNumber(result)) return result;
        for(let i= 0; i<operationQueue.length; i++) {
            const operationName = operationQueue[i];
            const operation = this.config[operationName];
            while(operation.extractOperationBody(result) != null) {
                const operationBody = operation.extractOperationBody(result);
                if(operationBody) {
                    const operatorSign = operation.extractOperationSign(operationBody);
                    const operands = operation
                        .extractOperands(operatorSign, operationBody)
                        .map(expr => this.#calculatePureExpression(expr));
                    const operatorProps = this.config[operationName].operations[operatorSign];
                    const operationResult = operatorProps.calc(...toNumberArray(operands));
                    if(operationResult?.errors?.length > 0) return operationResult;
                    result = result.replace(operationBody, operationResult);
                    if(stringIsNumber(result)) return result;
                }
            }
        }
    }

    #getOperationQueue() {
        const operations = Object.entries(this.config);
        operations.sort(([,a], [,b]) => a.priority - b.priority);
        return operations.map(([key,]) => key);
    }

    #getValidationResultErrors(calculationResult) {
        const invalidCalculationResult = calculationResult == null || Number.isNaN(calculationResult);
        return invalidCalculationResult
            ? [INVALID_EXPRESSION_INPUT_ERROR]
            : calculationResult?.errors;
    }
}
