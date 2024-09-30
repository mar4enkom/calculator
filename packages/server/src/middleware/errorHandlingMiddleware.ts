import {AppError} from "../shared/errors/types";
import {RestRequest, RestResponse} from "../shared/types/express";
import {NextFunction} from "express";
import {getErrorBody} from "../shared/errors/utils/utils";
import {sendErrorResponse} from "../shared/utils/sendResponse";
import {errorHandler} from "@/shared/errors/ErrorHandler";

export async function errorHandlingMiddleware(
    error: AppError,
    _req: RestRequest<any>,
    res: RestResponse<any>,
    _next: NextFunction
): Promise<void> {
    const errorBody = getErrorBody(error);
    sendErrorResponse(errorBody, error.httpCode, res);

    await errorHandler.handleError(error);
}