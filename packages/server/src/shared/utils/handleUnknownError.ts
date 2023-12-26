import {ServerError} from "../errors/ServerError";
import {HttpStatusCodes} from "../constants/httpStatusCodes";
import {ServerErrorCodes} from "../constants/serverErrors";

export function handleUnknownError(error: unknown) {
    throw new ServerError(
        HttpStatusCodes.INTERNAL_SERVER_ERROR,
        ServerErrorCodes.UNKNOWN_SERVER_ERROR,
        "Unknown server error",
        true
    );
}