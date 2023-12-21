import {ErrorMap} from "@calculator/common";

export enum ClientErrorCodes {
    UNKNOWN_SERVER_ERROR = "UNKNOWN_SERVER_ERROR"
}

export const ClientErrors: ErrorMap<ClientErrorCodes> = {
    [ClientErrorCodes.UNKNOWN_SERVER_ERROR]: {
        code: ClientErrorCodes.UNKNOWN_SERVER_ERROR,
        message: "Unknown server error"
    }
}