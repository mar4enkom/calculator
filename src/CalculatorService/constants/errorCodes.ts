export enum OperationErrorCodes {
        NUMBER_OF_ARGUMENTS = "NUMBER_OF_ARGUMENTS",
        nonNegativeArguments = "nonNegativeArguments",
        disableZeroDivision = "disableZeroDivision",
}

export enum CalculationErrorCode {
    "INVALID_EXPRESSION_INPUT" = "INVALID_EXPRESSION_INPUT",
    "UNKNOWN_ERROR" = "UNKNOWN_ERROR",
}

export enum InitialValidationErrorCode {
    "INVALID_PARENTHESES_NESTING" = "INVALID_PARENTHESES_NESTING"
}

export type ErrorCodes =
    | OperationErrorCodes
    | CalculationErrorCode
    | InitialValidationErrorCode;
