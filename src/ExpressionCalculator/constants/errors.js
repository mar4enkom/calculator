import {CalculationErrorCodes} from "CalculatorService/constants/errorCodes.js";

export const CalculationErrors = {
    [CalculationErrorCodes.INVALID_EXPRESSION_INPUT]: {
        message: "Invalid expression input",
        code: CalculationErrorCodes.INVALID_EXPRESSION_INPUT,
    },
    [CalculationErrorCodes.UNKNOWN_ERROR]: {
        message: "Unknown runtime error",
        code: CalculationErrorCodes.UNKNOWN_ERROR,
    },
}