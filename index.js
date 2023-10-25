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

function getOperationQueues(config) {
    function getPrioritisedOperationKeys(isFunctionArguments) {
        const operations = Object.entries(config);
        operations.sort(([,a], [,b]) => a.priority - b.priority);
        return operations.map(([key,]) => key);
    }

    const operationQueue = getPrioritisedOperationKeys(config);

    const {
        [Operations.FUNCTION]: _,
        ...operationsWithoutFunction
    } = config;
    const functionArgumentsOperationQueue = getPrioritisedOperationKeys(operationsWithoutFunction);

    return {operationQueue, functionArgumentsOperationQueue}
}

const {operationQueue, functionArgumentsOperationQueue} = getOperationQueues(operationsConfig);

function evaluate(expression) {
    const formattedExpression = removeSpaces(expression);

    const validationService = new ValidationService();
    const validationError = validationService.validate(formattedExpression);

    if (validationError) throw validationError;

    let currentExpression = formattedExpression;

    while(!isNumber(currentExpression)) {
            const matchedParenthesesExpression = Regex.LARGEST_NESTING.exec(currentExpression)?.[0];
            const innerMatchedParenthesesExpression = matchedParenthesesExpression
                ? matchedParenthesesExpression.slice(1, matchedParenthesesExpression.length-1)
                : currentExpression;
            const operationResult = calculatePureExpression(innerMatchedParenthesesExpression, operationQueue);
        const operationResultToReplace = matchedParenthesesExpression || currentExpression;
        currentExpression = currentExpression.replace(operationResultToReplace, operationResult);
    }
    return currentExpression;
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
                        .map(expr => calculatePureExpression(expr, functionArgumentsOperationQueue));
                }
                const operationResult = operatorProps.calc(...toNumberArray(operands));
                result = result.replace(operationBody, operationResult);
                if(isNumber(result)) return result;
            }
        }
    }
}

//evaluate("(sqrt(2) * sin(45°) + 4/2 - sqrt(9)/3) * (10/2 + sqrt(16/4) - sin(30°)/2)")
//console.log(evaluate("sqrt(4)"))
//console.log(evaluate("-sqrt(4)*10"))
console.log(evaluate("(sqrt(2) * sin(45°) + 4/2 - sqrt(9)/3) * (10/2 + sqrt(16/4) - sin(30°)/2)"))
//13.5
//console.log(evaluate("(sqrt(4) + ((15 - 5 * sin(30°)) - 2) * (3 + 1)) + ((2 + 2) * 2)"))
//52
//console.log(evaluate("4*(0.25+0.75)"))

