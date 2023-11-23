import {Symbols} from "../constants/constants.js";

export const operators = [
    {
        name: "Subtract",
        sign: Symbols.MINUS,
        calculateExpression: (a, b) => a - b,
        priority: 2,
    },
    {
        name: "Add",
        sign: "+",
        calculateExpression: (a, b) => a + b,
        priority: 2,
    },
    {
        name: "Remainder of the division",
        sign: "%",
        calculateExpression: (a, b) => a % b,
        priority: 1,
    },
    {
        name: "Divide",
        sign: "/",
        calculateExpression: (a, b) => a / b,
        priority: 1,
    },
    {
        name: "Multiply",
        sign: "*",
        calculateExpression: (a, b) => a * b,
        priority: 1,
    },
    {
        name: "power",
        sign: "^",
        calculateExpression: (a, b) => Math.pow(a,b),
        priority: 0,
    },
];