export const operationsConfig = {
    "*": {
        name: "Multiply",
        calc: (currentValue, prevValue) => prevValue * currentValue,
    },
    "/": {
        name: "Divide",
        calc: (currentValue, prevValue) => prevValue / currentValue,
    },
    "%": {
        name: "Remainder of the division",
        calc: (currentValue, prevValue) => prevValue % currentValue,
    }
}