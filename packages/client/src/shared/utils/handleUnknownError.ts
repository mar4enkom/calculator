import {AppError} from "@/shared/helpers/error/AppError";
import {ClientErrors, ErrorCodes} from "@/shared/contstants/clientErrors";

export function handleUnknownError(error: unknown): AppError {
    if(error instanceof AppError) return error;
    return new AppError([ClientErrors.UNKNOWN_APP_ERROR], ErrorCodes.UNKNOWN_APP_ERROR);
}