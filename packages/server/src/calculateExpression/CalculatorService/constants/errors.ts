import {CalculationErrorCode} from "./errorCodes";
import {ErrorMap} from "@calculator/common";

export const CalculationErrors: ErrorMap<CalculationErrorCode> = {
    INVALID_EXPRESSION_INPUT: {
        message: "Invalid expression input",
        code: CalculationErrorCode.INVALID_EXPRESSION_INPUT,
    },
    UNKNOWN_ERROR: {
        message: "Unknown runtime error",
        code: CalculationErrorCode.UNKNOWN_ERROR,
    },
}