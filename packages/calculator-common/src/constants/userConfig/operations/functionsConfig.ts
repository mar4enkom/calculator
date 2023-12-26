import {FunctionOperationList} from "../../../types/api/modules/userConfig";

export const functions: FunctionOperationList = [
    {
        name: "sine",
        sign: "sin",
        calculateExpression: (expr) => Math.sin(expr),
    },
    {
        name: "square root",
        sign: "sqrt",
        calculateExpression: (expr) => Math.sqrt(expr),
        validations: {
            nonNegativeArguments: true,
        }
    },
    {
        name: "cosine",
        sign: "cos",
        calculateExpression: (expr) => Math.cos(expr),
    },
    {
        name: "sum",
        sign: "sum",
        calculateExpression: (a, b) => a + b,
    },
    {
        name: "diff",
        sign: "diff",
        calculateExpression: (a, b) => a - b,
    },
    {
        name: "mult",
        sign: "mult",
        calculateExpression: (a, b) => a * b,
    },
    {
        name: "div",
        sign: "div",
        calculateExpression: (a, b) => a / b,
    },
    {
        name: "log",
        sign: "log",
        calculateExpression: (expr) => Math.log(expr),
        validations: {
            nonNegativeArguments: true,
        }
    },
    {
        name: "log2",
        sign: "log2",
        calculateExpression: (expr) => Math.log2(expr),
        validations: {
            nonNegativeArguments: true,
        }
    },
    {
        name: "log10",
        sign: "log10",
        calculateExpression: (expr) => Math.log10(expr),
        validations: {
            nonNegativeArguments: true,
        }
    },
    {
        name: "exponentiation",
        sign: "pow",
        calculateExpression: (expr, power) => Math.pow(expr, power),
    },
    {
        name: "factorial",
        sign: "!",
        calculateExpression: (n) =>
            n > 1 ? Array.from({ length: n }, (_, i) => i + 1).reduce((acc, val) => acc * val, 1) : 1,
        validations: {
            nonNegativeArguments: true,
        },
        postfixForm: true
    },
    {
        name: "factorial",
        sign: "fact",
        calculateExpression: (n) =>
            n > 1 ? Array.from({ length: n }, (_, i) => i + 1).reduce((acc, val) => acc * val, 1) : 1,
        validations: {
            nonNegativeArguments: true,
        },
    }
];