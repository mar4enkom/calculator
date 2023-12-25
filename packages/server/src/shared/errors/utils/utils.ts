import {AppError} from "../types";
import {assert, ErrorBody} from "@calculator/common";
import {MultiError} from "../MultiError";
import {ServerError} from "../ServerError";

export function getErrorBody(error: AppError): ErrorBody {
    if(error instanceof MultiError) {
        return error.errors;
    } else if(error instanceof ServerError) {
        const errorBody = {
            message: error.message,
            code: error.errorCode,
        };
        return [errorBody];
    }

    assert(error);
}