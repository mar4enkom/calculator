import {RestRequest, RestResponse} from "../shared/types/express";
import {sendErrorResponse} from "../shared/utils/sendResponse";
import {ServerErrors} from "../shared/constants/serverErrors";
import {HttpStatusCodes} from "../shared/constants/httpStatusCodes";

export function notFoundMiddleware(req: RestRequest, res: RestResponse<any>): void {
    sendErrorResponse([ServerErrors.INVALID_PATH], HttpStatusCodes.NOT_FOUND, res);
}