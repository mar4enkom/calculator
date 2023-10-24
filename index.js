import {ValidationService} from "./services/ValidationService.js";
import {composeValidations} from "./utils/composeValidations.js";
import {removeSpaces} from "./utils/removeSpaces.js";
import {Symbols} from "./constants/constants.js";
import {Regex} from "./constants/regex.js";
import {operationsConfig} from "./config/operations/index.js";
import {Operations} from "./config/operations/constants.js";
import {isNumber} from "./utils/isNumber.js";

function getFunctionArgs(str) {
    const argsStr = str.slice(str.indexOf(Symbols.LP)+1, str.indexOf(Symbols.RP));
    return argsStr.split(Symbols.COMMA);
}

function toNumberArray(stringArr) {
    return stringArr.map((item) => Number(item))
}

function evaluate(expression) {
    const formattedExpression = removeSpaces(expression);

    const validationService = new ValidationService();
    const validationError = validationService.validate(formattedExpression);

    if (validationError) throw validationError;

    let currentExpression = formattedExpression;

    while(Regex.MOST_NESTED_PARENTHESES_INNER.test(currentExpression)) {
        const { extractOperationBody: extractFunctionBody } = operationsConfig[Operations.FUNCTION];
        const matchedFunctionWithoutSubFunction = extractFunctionBody(currentExpression);
        if(matchedFunctionWithoutSubFunction != null) {
            const operationResult = calculatePureExpression(matchedFunctionWithoutSubFunction, [Operations.FUNCTION]);
            currentExpression = currentExpression.replace(matchedFunctionWithoutSubFunction, operationResult);
        } else {
            const matchedParenthesesExpression = Regex.MOST_NESTED_PARENTHESES_INNER.exec(currentExpression)[0];
            const operationResult = calculatePureExpression(matchedParenthesesExpression, [
                Operations.CONSTANT,
                Operations.SIGN,
                Operations.OPERATOR_HIGH_PRIORITY,
                Operations.OPERATOR_LOW_PRIORITY,
                Operations.OPERATOR_HIGH_PRIORITY,
                Operations.OPERATOR_LOW_PRIORITY
            ]);
            currentExpression = currentExpression.replace(`(${matchedParenthesesExpression})`, operationResult);
        }
    }
    return calculatePureExpression(currentExpression, [
        Operations.CONSTANT,
        Operations.SIGN,
        Operations.OPERATOR_HIGH_PRIORITY,
        Operations.OPERATOR_LOW_PRIORITY,
    ]);
}

function calculatePureExpression(expression, operationQueue) {
    let result = expression;

    if(isNumber(result)) return result;
    for(let i= 0; i<operationQueue.length; i++) {
        const operationName = operationQueue[i];
        const operation = operationsConfig[operationName];
        while(operation.extractOperationBody(result) != null) {
            const operationBody = operation.extractOperationBody(result);
            if(operationBody) {
                const operatorSign = operation.extractOperationSign(operationBody);
                let operands = operation.extractOperands(operatorSign, operationBody);
                const operatorProps = operationsConfig[operationName].operations[operatorSign];
                if(operationName === Operations.FUNCTION) {
                    operands = operands
                        .map(expr => calculatePureExpression(expr, [
                            Operations.CONSTANT,
                            Operations.SIGN,
                            Operations.OPERATOR_HIGH_PRIORITY,
                            Operations.OPERATOR_LOW_PRIORITY,
                        ]));
                }
                const operationResult = operatorProps.calc(...toNumberArray(operands));
                result = result.replace(operationBody, operationResult);
                if(isNumber(result)) return result;
            }
        }
    }
}

console.log(evaluate("(sqrt(2) * sin(45°) + 4/2 - sqrt(9)/3) * (10/2 + sqrt(16/4) - sin(30°)/2)"))
//console.log(evaluate("(sqrt(4) + ((15 - 5 * sin(30°)) - 2) * (3 + 1)) + ((2 + 2) * 2)"))
//console.log(evaluate("4*(0.25+0.75)"))

