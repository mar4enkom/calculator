import {Operations} from "../../../../constants/operations.js";
import {constants} from "../../../../../userConfig/operations/configs/constantsConfig.js";
import {signs} from "../../../../../userConfig/operations/configs/signsConfig.js";
import {functions} from "../../../../../userConfig/operations/configs/functionsConfig.js";
import {operators} from "../../../../../userConfig/operations/configs/operatorsConfig.js";

export const testConfig = {
    [Operations.CONSTANT]: [
        {
            name: "pi",
            sign: "π",
            calc: () => Math.PI
        },
        {
            name: "e",
            sign: "e",
            calc: () => Math.E,
        }
    ],
    [Operations.SIGN]: [
        {
            name: "degree",
            sign: "°",
            calc: (degrees) => degrees * (Math.PI / 180)
        }
    ],
    [Operations.FUNCTION]: [
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
        }
    ],
    [Operations.OPERATOR]: [
        {
            name: "power",
            sign: "^",
            calc: (a, b) => Math.pow(a,b),
            priority: 0,
        },
        {
            name: "Multiply",
            sign: "*",
            calc: (a, b) => a * b,
            priority: 1,
        },
        {
            name: "Divide",
            sign: "/",
            calc: (a, b) => a / b,
            priority: 1,
        },
        {
            name: "Remainder of the division",
            sign: "%",
            calc: (a, b) => a % b,
            priority: 1,
        },
        {
            name: "Add",
            sign: "+",
            calc: (a, b) => a + b,
            priority: 2,
        },
        {
            name: "Subtract",
            sign: "-",
            calc: (a, b) => a - b,
            priority: 2,
        },

    ],
}