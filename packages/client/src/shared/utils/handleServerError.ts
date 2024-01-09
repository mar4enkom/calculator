import {AppError} from "../helpers/error/AppError";
import {ClientErrors, ErrorCodes} from "../contstants/clientErrors";

export function handleServerError(error: unknown): AppError {
    if(error && typeof error === 'object' && "errors" in error && Array.isArray(error.errors)) {
        const errorList = error.errors;
        const isMultiError = errorList.every(el => "message" in el && "code" in el);
        if(isMultiError) return new AppError(errorList, ErrorCodes.SERVER_ERROR);
    }
    return new AppError([ClientErrors.SERVER_ERROR], ErrorCodes.UNKNOWN_SERVER_ERROR);
}