import {ErrorMap} from "@calculator/common";

export enum ServerErrorCodes {
    UNKNOWN_SERVER_ERROR = "UNKNOWN_SERVER_ERROR"
}

export const ServerErrors: ErrorMap<ServerErrorCodes> = {
    [ServerErrorCodes.UNKNOWN_SERVER_ERROR]: {
        code: ServerErrorCodes.UNKNOWN_SERVER_ERROR,
        message: "Unknown server error"
    }
}