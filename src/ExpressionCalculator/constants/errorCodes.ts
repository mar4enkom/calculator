// TODO: consider refactoring to union literal
export enum OperationErrorCodes {
    NUMBER_OF_ARGUMENTS = "NUMBER_OF_ARGUMENTS",
    NON_NEGATIVE_ARGUMENTS = "nonNegativeArguments",
    ZERO_DIVISION = "disableZeroDivision",
}
export enum CalculationErrorCodes {
    INVALID_EXPRESSION_INPUT = "INVALID_EXPRESSION_INPUT",
    UNKNOWN_ERROR = "UNKNOWN_ERROR",
}
export enum InitialValidationErrorsCodes {
    INVALID_PARENTHESES_NESTING = "INVALID_PARENTHESES_NESTING",
}