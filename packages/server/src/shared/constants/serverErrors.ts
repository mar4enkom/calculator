import {ErrorMap} from "@calculator/common";

export enum ServerErrorCodes {
    UNKNOWN_SERVER_ERROR = "UNKNOWN_SERVER_ERROR",
    INVALID_PATH = "INVALID_PATH",
    VALIDATION_ERROR = "VALIDATION_ERROR",
}

export const ServerErrors: ErrorMap<ServerErrorCodes> = {
    [ServerErrorCodes.UNKNOWN_SERVER_ERROR]: {
        code: ServerErrorCodes.UNKNOWN_SERVER_ERROR,
        message: "Unknown server error"
    },
    [ServerErrorCodes.INVALID_PATH]: {
        code: ServerErrorCodes.INVALID_PATH,
        message: "Invalid path"
    },
    [ServerErrorCodes.VALIDATION_ERROR]: {
        code: ServerErrorCodes.VALIDATION_ERROR,
        message: "Validation error"
    }
}