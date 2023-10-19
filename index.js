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
                console.log(expressionArr.slice(i).join(""))
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
                        const operatedValue = signProps.calc(currentNumber, prevValue);
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

//console.log(evaluate("(1+(4+5-2)*3)+1"))
