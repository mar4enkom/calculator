import {ErrorMap} from "@calculator/common";

export enum ErrorCodes {
    SERVER_ERROR = "SERVER_ERROR",
    UNKNOWN_SERVER_ERROR = "UNKNOWN_SERVER_ERROR",
    UNKNOWN_APP_ERROR = "UNKNOWN_APP_ERROR",
    VALIDATION_ERROR = "VALIDATION_ERROR",
}

export const ClientErrors: ErrorMap<ErrorCodes> = {
    [ErrorCodes.SERVER_ERROR]: {
        code: ErrorCodes.SERVER_ERROR,
        message: "Server error"
    },
    [ErrorCodes.VALIDATION_ERROR]: {
        code: ErrorCodes.VALIDATION_ERROR,
        message: "Validation error"
    },
    [ErrorCodes.UNKNOWN_SERVER_ERROR]: {
        code: ErrorCodes.UNKNOWN_SERVER_ERROR,
        message: "Unknown server error"
    },
    [ErrorCodes.UNKNOWN_APP_ERROR]: {
        code: ErrorCodes.UNKNOWN_APP_ERROR,
        message: "Unknown application error"
    }
}