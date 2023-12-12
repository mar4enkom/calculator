import {Validation} from "shared/utils/getValidationErrors";

enum ErrorCodes {
    INVALID_INPUT_FORMAT = "INVALID_INPUT_FORMAT",
}

export const initialValidations: Validation<ErrorCodes>[] = [
    {
        validate: (val) => typeof val === "string",
        message: "Invalid input format",
        code: ErrorCodes.INVALID_INPUT_FORMAT,
    }
];
