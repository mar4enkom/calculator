
export const functions = [
    {
        name: "sine",
        sign: "sin",
        calc: (expr) => Math.sin(expr),
    },
    {
        name: "square root",
        sign: "sqrt",
        calc: (expr) => Math.sqrt(expr),
    },
    {
        name: "exponentiation",
        sign: "pow",
        calc: (expr, power) => Math.pow(expr, power),
    }
];