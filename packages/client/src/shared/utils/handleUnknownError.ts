import {AppError} from "../helpers/AppError";
import {ClientErrors, ErrorCodes} from "../contstants/clientErrors";

export function handleUnknownError(error: unknown): AppError {
    if(error instanceof AppError) return error;
    return new AppError([ClientErrors.UNKNOWN_APP_ERROR], ErrorCodes.UNKNOWN_APP_ERROR);
}