import {Validation} from "shared/utils/getValidationErrors";

type ControllerErrorCode = "INVALID_INPUT_FORMAT";

export const initialValidations: Validation<ControllerErrorCode>[] = [
    {
        validate: (val) => typeof val === "string",
        message: "Invalid input format",
        code: "INVALID_INPUT_FORMAT",
    }
];
