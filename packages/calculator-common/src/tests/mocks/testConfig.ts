import {UserConfig} from "../../types/modules/userConfig";

export const TestSymbols = {
    LP: "(",
    RP: ")",
    COMMA: ",",
    EQUALS: "=",
    DOT: ".",
    CE: "CE",

    MINUS: "-",
    INFINITY: "∞",
}

export const testConfig: UserConfig = {
    constant: [
        {
            name: "pi",
            sign: "π",
            calculateExpression: () => Math.PI
        },
        {
            name: "e",
            sign: "e",
            calculateExpression: () => Math.E,
        },
        {
            name: "Infinity",
            sign: TestSymbols.INFINITY,
            calculateExpression: () => Infinity,
        }
    ],
    sign: [
        {
            name: "degree",
            sign: "°",
            calculateExpression: (degrees) => degrees * (Math.PI / 180)
        }
    ],
    function: [
        {
            name: "sine",
            sign: "sin",
            calculateExpression: (expr) => Math.sin(expr),
        },
        {
            name: "cosing",
            sign: "cos",
            calculateExpression: (expr) => Math.cos(expr),
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
        }
    ],
    operator: [
        {
            name: "power",
            sign: "^",
            calculateExpression: (a, b) => Math.pow(a,b),
            priority: 0,
        },
        {
            name: "Multiply",
            sign: "*",
            calculateExpression: (a, b) => a * b,
            priority: 1,
        },
        {
            name: "Divide",
            sign: "/",
            calculateExpression: (a, b) => a / b,
            priority: 1,
        },
        {
            name: "Remainder of the division",
            sign: "%",
            calculateExpression: (a, b) => a % b,
            priority: 1,
        },
        {
            name: "Add",
            sign: "+",
            calculateExpression: (a, b) => a + b,
            priority: 2,
        },
        {
            name: "Subtract",
            sign: "-",
            calculateExpression: (a, b) => a - b,
            priority: 2,
        },

    ],
}