import {CustomErrorType} from "calculatorService/types/errors";
import {CalculationErrorCodes} from "calculatorService/constants/errorCodes";

export const CalculationErrors: Record<CalculationErrorCodes, CustomErrorType<CalculationErrorCodes>> = {
    [CalculationErrorCodes.INVALID_EXPRESSION_INPUT]: {
        message: "Invalid expression input",
        code: CalculationErrorCodes.INVALID_EXPRESSION_INPUT,
    },
    [CalculationErrorCodes.UNKNOWN_ERROR]: {
        message: "Unknown runtime error",
        code: CalculationErrorCodes.UNKNOWN_ERROR,
    },
}