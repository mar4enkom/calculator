import {assert, ErrorBody} from "@calculator/common";
import {MultiError} from "../MultiError";
import {ServerError} from "../ServerError";
import {ServerErrors} from "../../constants/serverErrors";

export function getErrorBody(error: Error): ErrorBody {
    if(error instanceof MultiError) {
        return error.errors;
    } else if(error instanceof ServerError) {
        const errorBody = {
            message: error.message,
            code: error.errorCode,
        };
        return [errorBody];
    } else if(error instanceof Error) {
        return [ServerErrors.UNKNOWN_SERVER_ERROR];
    }

    assert(error);
}