import {Symbols} from "UserConfig/constants/constants.js";
import {ErrorCodes} from "./errorCodes.js";

export class InitialValidationsProvider {
    static validations = [
        {
            validate: (val) => typeof val === "string",
            message: "Invalid input format",
            code: ErrorCodes.INVALID_INPUT_FORMAT,
        }
    ]
}