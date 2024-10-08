import {ServerError} from "../errors/ServerError";
import {HttpStatusCodes} from "../constants/httpStatusCodes";
import {ServerErrorCodes} from "../constants/serverErrors";
import {MultiError} from "../errors/MultiError";

export function handleUnknownError(error: unknown) {
    if(error instanceof MultiError || error instanceof ServerError) {
        return error;
    }

    // TODO: ServerError doesn't keep stack trace of error. Should fix it!
    console.log(error);

    return new ServerError(
        HttpStatusCodes.INTERNAL_SERVER_ERROR,
        ServerErrorCodes.UNKNOWN_SERVER_ERROR,
        "Unknown server error",
        true
    );
}