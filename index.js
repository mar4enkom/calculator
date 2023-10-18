import {Symbols} from "./constants.js";
import {ValidationService} from "./services/ValidationService.js";

function removeSpaces(string) {
    return string.replaceAll(" ");
}

const OperationTypes = {
    FUNCTION: "FUNCTION",
    OPERATOR: "OPERATOR"
}

const operationsConfig = {
    "*": {
        type: OperationTypes.OPERATOR,
        func: (currentValue, prevValue) => prevValue * currentValue,
    },
    "/": {
        type: OperationTypes.OPERATOR,
        func: (currentValue, prevValue) => prevValue / currentValue,
    },
    "%": {
        type: OperationTypes.OPERATOR,
        func: (currentValue, prevValue) => prevValue % currentValue,
    }
}

function evaluate(expression) {
    const validationService = new ValidationService();
    const validationError = validationService.validateExpression(expression);

    if(validationError) throw validationError;
    const formattedExpression = removeSpaces(expression);
    return helper(Array.from(expression), 0);
}

function helper(expressionArr, startIdx) {
    const stack = [];
    let sign = "+";
    let currentNumber = null;
    for (let i = startIdx; i < expressionArr.length; i++) {
        let currentSymbol = expressionArr[i];
        const currentSymbolIsNumber = !Number.isNaN(+currentSymbol);

        if (currentSymbolIsNumber) {
            currentNumber = currentNumber * 10 + +currentSymbol
        }

        if (!currentSymbolIsNumber || i===expressionArr.length-1) {
            if (currentSymbol === Symbols.LP) {
                currentNumber = helper(expressionArr, i+1);
                let leftBraceCount = 1;
                let rightBraceCount = 0;
                for (let j = i+1; j < expressionArr.length; j++) {
                    if (expressionArr[j] === Symbols.RP) {
                        rightBraceCount++;
                        if (rightBraceCount===leftBraceCount) {
                            i=j;
                            break;
                        }
                    } else if (expressionArr[j] === Symbols.LP) {
                        leftBraceCount++;
                    }
                }
            }

            if(sign !== "(" && sign !== ")") {
                if(sign === "+") {
                    stack.push(currentNumber);
                } else if (sign === "-") {
                    stack.push(-1 * currentNumber);
                } else {
                    const signProps = operationsConfig[sign];
                    if(signProps != null) {
                        const prevValue = stack.pop();
                        const operatedValue = signProps.func(currentNumber, prevValue);
                        stack.push(operatedValue);
                    } else {
                        throw new Error(`No such a signature: ${sign}`);
                    }
                }
            }
            sign = currentSymbol;
            currentNumber = null;
            if (currentSymbol===Symbols.RP) break;
        }
        // console.log({currentNumber})
        // console.log({currentSymbol})
        // console.log({sign})
        // console.log({stack})
        // console.log("------")
    }

    let ans = 0;
    while (stack.length > 0) {
        ans += stack.pop();
    }
    return ans;
}

console.log(evaluate("(1+(4+5-2)*3)+1"))
