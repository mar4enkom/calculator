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

export class CalculateExpressionService {
    #config;
    constructor(config) {
        const configInitializer = ConfigInitializer.getInstance();
        this.#config = configInitializer.init(config);
    }
    calculate(expression) {
        const formattedExpression = removeSpaces(expression);
        const validationService = ValidationService.getInstance();
        const validationErrors = validationService.getValidationErrors(formattedExpression);
        if (validationErrors.length > 0) throw new Error(validationErrors);

        let currentExpression = formattedExpression;
        while(!stringIsNumber(currentExpression)) {
            const matchedParenthesesExpression = Regex.LARGEST_NESTING.exec(currentExpression)?.[0];
            const innerMatchedParenthesesExpression = matchedParenthesesExpression
                ? matchedParenthesesExpression.slice(1, matchedParenthesesExpression.length-1)
                : currentExpression;
            const operationResult = this.#calculatePureExpression(innerMatchedParenthesesExpression);
            const operationResultToReplace = matchedParenthesesExpression || currentExpression;
            currentExpression = currentExpression.replace(operationResultToReplace, operationResult);
        }
        return currentExpression;
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
                    let operands = operation.extractOperands(operatorSign, operationBody);
                    const operatorProps = this.#config[operationName].operations[operatorSign];
                    if(operationName === Operations.FUNCTION) {
                        operands = operands.map(expr => this.#calculatePureExpression(expr));
                    }
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

    #getFunctionArgs(functionString) {
        const argsStr = functionString.slice(functionString.indexOf(Symbols.LP)+1, functionString.indexOf(Symbols.RP));
        return argsStr.split(Symbols.COMMA);
    }
}

const c = new CalculateExpressionService(operationsConfig);

console.log(c.calculate("-sqrt(4)*10"))
console.log(c.calculate("(sqrt(2) * sin(45°) + 4/2 - sqrt(9)/3) * (10/2 + sqrt(16/4) - sin(30°)/2)"))
//13.5
console.log(c.calculate("(sqrt(4) + ((15 - 5 * sin(30°)) - 2) * (3 + 1)) + ((2 + 2) * 2)"))
//52
console.log(c.calculate("-4*(0.25+0.75)"))

