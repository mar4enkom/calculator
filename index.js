console.log(evaluate("2*(1+(2*(3+1)))"))

function evaluate(expression) {
    expression = expression.replace(/\s/g, '');
    return helper(Array.from(expression), 0);
}

function helper(expressionArr, startIdx) {
    const stack = [];
    let sign = null;
    let currentNumber = null;
    for (let i = startIdx; i < expressionArr.length; i++) {
        let currentSymbol = expressionArr[i];
        const currentSymbolIsNumber = !Number.isNaN(+currentSymbol);

        if (currentSymbolIsNumber) {
            currentNumber = currentNumber * 10 + +currentSymbol;
        }

        if (!currentSymbolIsNumber || i===expressionArr.length-1) {
            if (currentSymbol==='(') {
                console.log("recursion before")
                currentNumber = helper(expressionArr, i+1);
                console.log("recursion after")

                let leftBracketCount = 1;
                let rightBracketCount = 0;
                for (let j = i+1; j < expressionArr.length; j++) {
                    if (expressionArr[j] === ')') {
                        i=j;
                        break;
                    }
                }
            }

            if(stack.length === 0) {
                stack.push(currentNumber);
            } else {
                switch (sign) {
                    case '+':
                        stack.push(currentNumber);
                        break;
                    case '-':
                        stack.push(currentNumber*-1);
                        break;
                    case '*': {
                        const prevValue = stack.pop();
                        stack.push(prevValue*currentNumber);
                        break;
                    }
                    case '/': {
                        const prevValue = stack.pop();
                        stack.push(prevValue/currentNumber);
                        break;
                    }
                    default: {}
                    //throw new Error("No such a signature" + sign);
                }
            }
            sign = currentSymbol;
            currentNumber = null;
            if (currentSymbol===')') break;
        }
        console.log({currentNumber})
        console.log({currentSymbol})
        console.log({sign})
        console.log({stack})
        console.log("------")
    }

    let ans = 0;
    while (stack.length > 0) {
        ans += stack.pop();
    }
    return ans;
}