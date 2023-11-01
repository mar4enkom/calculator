
export const functions = [
    {
        name: "sine",
        sign: "sin",
        calc: (expr) => Math.sin(expr),
    },
    {
        name: "cosing",
        sign: "cos",
        calc: (expr) => Math.cos(expr),
    },
    {
        name: "square root",
        sign: "sqrt",
        calc: (expr) => Math.sqrt(expr),
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
    }
];