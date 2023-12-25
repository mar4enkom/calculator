import {BaseServerError} from "../errors/BaseServerError";
import {ServerError} from "../errors/ServerError";
import {HttpStatusCodes} from "../constants/httpStatusCodes";
import {ServerErrorCodes} from "../constants/serverErrors";

export function handleError(error: unknown) {
    if(error instanceof BaseServerError) {
        throw error;
    }
    throw new ServerError(HttpStatusCodes.INTERNAL_SERVER_ERROR, ServerErrorCodes.UNKNOWN_SERVER_ERROR);
}