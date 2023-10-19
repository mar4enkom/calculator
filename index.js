import {ValidationService} from "./services/ValidationService.js";
import {degreesToRadians} from "./utils/degreesToRadians.js";
import {composeValidations} from "./utils/composeValidations.js";
import {removeSpaces} from "./utils/removeSpaces.js";
import {functionsConfig} from "./config/functionsConfig/functionsConfig.js";
import {operationsConfig} from "./config/operationsConfig.js";
import {Symbols} from "./constants.js";

function evaluate(expression) {
    const validationService = new ValidationService();
    const validationError = validationService.validate(expression);

    if (validationError) throw validationError;
    const formattedExpression = removeSpaces(expression);
    return calculateSubExpression(Array.from(expression));
}

function getLastClosedParenthesisIndex(expressionArr, currentIndex) {
    let leftBraceCount = 1;
    let rightBraceCount = 0;
    for (let j = currentIndex + 1; j < expressionArr.length; j++) {
        if (expressionArr[j] === Symbols.RP) {
            rightBraceCount++;
            if (rightBraceCount === leftBraceCount) {
                return j;
            }
        } else if (expressionArr[j] === Symbols.LP) {
            leftBraceCount++;
        }
    }
}

function operate(currentNumber, sign, stack) {
    if (sign === "+") {
        stack.push(currentNumber);
    } else if (sign === "-") {
        stack.push(-1 * currentNumber);
    } else {
        const signProps = operationsConfig[sign];
        if (signProps != null) {
            const prevValue = stack.pop();
            const operatedValue = signProps.calc(currentNumber, prevValue);
            stack.push(operatedValue);
        } else {
            throw new Error(`No such a signature: ${sign}`);
        }
    }
}

function calculateSubExpression(expressionArr) {
    const stack = [];
    let lastSign = "+";
    let currentNumber = null;

    for (let i = 0; i < expressionArr.length; i++) {
        console.log(expressionArr.join(""))
        const currentSymbol = expressionArr[i];
        const currentSymbolIsNumber = !Number.isNaN(+currentSymbol);

        if (currentSymbolIsNumber) {
            currentNumber = currentNumber * 10 + +currentSymbol
        }

        if(i === expressionArr.length - 1) {
            operate(currentNumber, lastSign, stack)
        }

        if (!currentSymbolIsNumber) {
            if (currentSymbol === Symbols.LP) {
                const lastParenthesisIndex = getLastClosedParenthesisIndex(expressionArr, i);
                const expressionInParenthesis = expressionArr.slice(i+1, lastParenthesisIndex);
                currentNumber = calculateSubExpression(expressionInParenthesis);
                i = lastParenthesisIndex;
                continue;
            }

            operate(currentNumber, lastSign, stack);
            lastSign = currentSymbol;
            currentNumber = null;
        }
    }

    return stack.reduce((acc, el) => acc + el);
}

console.log(evaluate("(1+(15-5*2-2)*3)+1"))
