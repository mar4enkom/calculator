import {ErrorCodes} from "./errorCodes.js";

export const initialValidations = [
    {
        validate: (val) => typeof val === "string",
        message: "Invalid input format",
        code: ErrorCodes.INVALID_INPUT_FORMAT,
    }
]