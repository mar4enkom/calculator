import {degreesToRadians} from "../../utils/degreesToRadians.js";
import {withValidatedCalc} from "./utils/withValidatedCalc.js";
import {validate} from "./utils/validate.js";

export const functionsConfig = withValidatedCalc({
    "sin": {
        calc: (expr) => Math.sin(degreesToRadians(+expr)),
        validate: validate("sin", {numberOfArguments: 1})
    },
    "sqrt": {
        calc: (expr) => Math.sqrt(+expr),
        validate: validate("sqrt", {
            numberOfArguments: 1,
            extraValidations: [(expr => !Number.isNaN(+expr) && +expr >= 0 || new Error("SQRT argument must be >= 0"))]
        })
    }
})