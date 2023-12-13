export type OperationErrorCode =
    | "NUMBER_OF_ARGUMENTS"
    | "nonNegativeArguments"
    | "disableZeroDivision";

export type CalculationErrorCode =
    | "INVALID_EXPRESSION_INPUT"
    | "UNKNOWN_ERROR";

export type InitialValidationErrorCode =
    | "INVALID_PARENTHESES_NESTING";

export type ErrorCode =
    | OperationErrorCode
    | CalculationErrorCode
    | InitialValidationErrorCode;
