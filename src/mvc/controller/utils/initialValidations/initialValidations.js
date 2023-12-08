const ErrorCodes = {
    INVALID_INPUT_FORMAT: "INVALID_INPUT_FORMAT",
}

export const initialValidations = [
    {
        validate: (val) => typeof val === "string",
        message: "Invalid input format",
        code: ErrorCodes.INVALID_INPUT_FORMAT,
    }
]