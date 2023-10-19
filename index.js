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
    // in the whole expression replace function expressions with its calculated values
    const calculatedFuncExpressions = replaceFunctionWithValue(formattedExpression);
    return calculateSubExpression(Array.from(calculatedFuncExpressions));
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

function replaceFunctionWithValue(expr) {
    const exprCopy = expr;
    return Object.keys(functionsConfig).reduce((acc, functionSign) => {
        if(acc.includes(`${functionSign}(`)) {
            const {calc} = functionsConfig[functionSign];
            const regex = new RegExp(`${functionSign}\\((.*?)\\)`, 'g');
            return acc.replaceAll(regex, (_, val) => calc(val));
        }
        return acc;
    }, exprCopy)
}

function calculateSubExpression(expressionArr) {
    const stack/* stack with elements to sum */ = [];
    let lastSign /* last sign in the iteration */ = "+";
    let currentNumber /* constructed number from chars */ = null;
    let numbersAfterComma /* count of numbers after comma in currentNumber */ = false;

    for (let i = 0; i < expressionArr.length; i++) {
        const currentSymbol = expressionArr[i];
        const currentSymbolIsNumber = !Number.isNaN(+currentSymbol);

        if (currentSymbolIsNumber) {
            if(numbersAfterComma) {
                currentNumber = currentNumber + +currentSymbol / 10**numbersAfterComma;
                numbersAfterComma++;
            } else {
                currentNumber = currentNumber * 10 + +currentSymbol;
            }
        }

        if(currentSymbol === "." && !Number.isNaN(+expressionArr[i+1])) {
            numbersAfterComma = 1;
            continue;
        };

        // if symbol is the last element in expression contracted by parentheses,
        // perform operation with current number and last sign
        if(i === expressionArr.length - 1 && currentNumber) {
            operate(currentNumber, lastSign, stack)
        }

        if (!currentSymbolIsNumber) {
            // if symbol is "(", start the recursion
            if (currentSymbol === Symbols.LP) {
                // find the ")" symbol index to understand where expression contracted by parentheses ends
                const lastParenthesisIndex = getLastClosedParenthesisIndex(expressionArr, i);
                // find expression contracted by parentheses to pass to recursion function
                const expressionInParenthesis = expressionArr.slice(i+1, lastParenthesisIndex);
                currentNumber = calculateSubExpression(expressionInParenthesis);
                // set index of the loop to the index of the ending of previous calculated expression
                i = lastParenthesisIndex;
                continue;
            }

            // currentSymbol is not a number and not parentheses => it is a operator,
            // so we can perform an operation
            operate(currentNumber, lastSign, stack);
            lastSign = currentSymbol;
            currentNumber = null;
            numbersAfterComma = 0;
        }
    }

    return stack.reduce((acc, el) => acc + el);
}

console.log(evaluate("(sqrt(4)+(15-5*sin(30)-2)*3)+1+(2+2)*2"))
console.log(evaluate("sin(21)"))

