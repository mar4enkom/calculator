
export const functions = [
    {
        name: "sine",
        sign: "sin",
        calc: (expr) => Math.sin(expr),
    },
    {
        name: "cosine",
        sign: "cos",
        calc: (expr) => Math.cos(expr),
    },
    {
        name: "sum",
        sign: "sum",
        calc: (a, b) => a + b,
    },
    {
        name: "diff",
        sign: "diff",
        calc: (a, b) => a - b,
    },
    {
        name: "mult",
        sign: "mult",
        calc: (a, b) => a * b,
    },
    {
        name: "div",
        sign: "div",
        calc: (a, b) => a / b,
    },
    {
        name: "log",
        sign: "log",
        calc: (expr) => Math.log(expr),
        validations: {
            nonNegativeArguments: true,
        }
    },
    {
        name: "log2",
        sign: "log2",
        calc: (expr) => Math.log2(expr),
        validations: {
            nonNegativeArguments: true,
        }
    },
    {
        name: "log10",
        sign: "log10",
        calc: (expr) => Math.log10(expr),
        validations: {
            nonNegativeArguments: true,
        }
    },
    {
        name: "exponentiation",
        sign: "pow",
        calc: (expr, power) => Math.pow(expr, power),
    },
    {
        name: "factorial",
        sign: "!",
        calc: (n) =>
            n > 1 ? Array.from({ length: n }, (_, i) => i + 1).reduce((acc, val) => acc * val, 1) : 1,
        validations: {
            nonNegativeArguments: true,
        },
        postfixForm: true
    },
    {
        name: "factorial",
        sign: "fact",
        calc: (n) =>
            n > 1 ? Array.from({ length: n }, (_, i) => i + 1).reduce((acc, val) => acc * val, 1) : 1,
        validations: {
            nonNegativeArguments: true,
        },
    }
];