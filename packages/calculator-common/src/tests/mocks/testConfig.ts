import {OperationsConfig} from "../../modules/config/types";

export enum TestSymbols {
    LP= "(",
    RP= ")",
    COMMA= ",",
    EQUALS= "=",
    DOT= ".",
    CE= "CE",

    MINUS= "-",
    INFINITY= "∞",
}

export enum TestDigitSymbols {
    ZERO = "0",
    ONE = "1",
    TWO = "2",
    THREE = "3",
    FOUR = "4",
    FIVE = "5",
    SIX = "6",
    SEVEN = "7",
    EIGHT = "8",
    NINE = "9",
}

export const testConfig: OperationsConfig = {
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
            calculateExpression: (degrees: number) => degrees * (Math.PI / 180)
        }
    ],
    function: [
        {
            name: "sine",
            sign: "sin",
            calculateExpression: (expr: number) => Math.sin(expr),
        },
        {
            name: "cosing",
            sign: "cos",
            calculateExpression: (expr: number) => Math.cos(expr),
        },
        {
            name: "square root",
            sign: "sqrt",
            calculateExpression: (expr: number) => Math.sqrt(expr),
            validations: {
                nonNegativeArguments: true,
            }
        },
        {
            name: "log10",
            sign: "log10",
            calculateExpression: (expr: number) => Math.log10(expr),
            validations: {
                nonNegativeArguments: true,
            }
        },
        {
            name: "exponentiation",
            sign: "pow",
            calculateExpression: (expr: number, power: number) => Math.pow(expr, power),
        },
        {
            name: "factorial",
            sign: "!",
            calculateExpression: (n: number) =>
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
            calculateExpression: (a: number, b: number) => Math.pow(a,b),
            priority: 0,
        },
        {
            name: "Multiply",
            sign: "*",
            calculateExpression: (a: number, b: number) => a * b,
            priority: 1,
        },
        {
            name: "Divide",
            sign: "/",
            calculateExpression: (a: number, b: number) => a / b,
            priority: 1,
        },
        {
            name: "Remainder of the division",
            sign: "%",
            calculateExpression: (a: number, b: number) => a % b,
            priority: 1,
        },
        {
            name: "Add",
            sign: "+",
            calculateExpression: (a: number, b: number) => a + b,
            priority: 2,
        },
        {
            name: "Subtract",
            sign: "-",
            calculateExpression: (a: number, b: number) => a - b,
            priority: 2,
        },

    ],
}