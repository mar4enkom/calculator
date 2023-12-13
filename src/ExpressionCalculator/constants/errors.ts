import {CalculationErrorCode} from "calculatorService/constants/errorCodes";
import {CustomErrorType} from "shared/types/calculationResult";

export const CalculationErrors: Record<CalculationErrorCode, CustomErrorType<CalculationErrorCode>> = {
    INVALID_EXPRESSION_INPUT: {
        message: "Invalid expression input",
        code: "INVALID_EXPRESSION_INPUT",
    },
    UNKNOWN_ERROR: {
        message: "Unknown runtime error",
        code: "UNKNOWN_ERROR",
    },
}