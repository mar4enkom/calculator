import {ValidationService} from "../../../services/ValidationService.js";
import {getValidationErrors} from "../../../utils/getValidationErrors.js";
import {removeSpaces} from "../../../utils/removeSpaces.js";
import {Symbols} from "../../../constants/constants.js";
import {Regex} from "../../../constants/regex.js";
import {operationsConfig} from "../../../config/operations/index.js";
import {Operations} from "../../../config/operations/constants.js";
import {stringIsNumber} from "../../../utils/stringIsNumber.js";
import {toNumberArray} from "../../../utils/toNumberArray.js";
import {ConfigInitializer} from "./ConfigInitializer.js";
import {Observable} from "./Observable.js";

export const ObservableType = {
    VALIDATION_ERROR: "error",
    CALCULATION_RESULT: "result",
}

export class CalculateExpressionService extends Observable {
    #config;
    constructor(config) {
        super();
        this.#config = ConfigInitializer.getInstance().init(config);
    }
    calculate(expression) {
        this.notify(ObservableType.CALCULATION_RESULT, this.#calculateExpression(expression))
    }

    #calculateExpression(expression) {
        let currentExpression = expression;
        let matchedParenthesesExpression;
        while((matchedParenthesesExpression = Regex.LARGEST_NESTING.exec(currentExpression)?.[0]) != null) {
            const innerMatchedParenthesesExpression = matchedParenthesesExpression.slice(1, matchedParenthesesExpression.length-1);
            const operationResult = this.#calculatePureExpression(innerMatchedParenthesesExpression);
            currentExpression = currentExpression.replace(matchedParenthesesExpression, operationResult);
        }

        const calculationResult = this.#calculatePureExpression(currentExpression);
        if(calculationResult == null || Number.isNaN(calculationResult)) {
            this.notify(ObservableType.VALIDATION_ERROR, "Invalid expression input");
            return null;
        }
        return calculationResult;
    }

    #calculatePureExpression(expression) {
        const operationQueue = this.#getOperationQueue();
        let result = expression;

        if(stringIsNumber(result)) return result;
        for(let i= 0; i<operationQueue.length; i++) {
            const operationName = operationQueue[i];
            const operation = this.#config[operationName];
            while(operation.extractOperationBody(result) != null) {
                const operationBody = operation.extractOperationBody(result);
                if(operationBody) {
                    const operatorSign = operation.extractOperationSign(operationBody);
                    const operands = operation
                        .extractOperands(operatorSign, operationBody)
                        .map(expr => this.#calculatePureExpression(expr));
                    const operatorProps = this.#config[operationName].operations[operatorSign];
                    const operationResult = operatorProps.calc(...toNumberArray(operands));
                    result = result.replace(operationBody, operationResult);
                    if(stringIsNumber(result)) return result;
                }
            }
        }
    }

    #getOperationQueue() {
        const operations = Object.entries(this.#config);
        operations.sort(([,a], [,b]) => a.priority - b.priority);
        return operations.map(([key,]) => key);
    }
}
