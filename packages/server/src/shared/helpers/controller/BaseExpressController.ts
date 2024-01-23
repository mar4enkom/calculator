import {RestRequest, RestResponse} from "@/shared/types/express";
import {NextFunction} from "express";
import {getRequestBody} from "@/shared/utils/getRequestBody";
import {sendSuccessResponse} from "@/shared/utils/sendResponse";
import {handleUnknownError} from "@/shared/utils/handleUnknownError";

export abstract class BaseExpressController {
    protected async handleRequest<T, K>(
        req: RestRequest<T>,
        res: RestResponse<K>,
        next: NextFunction,
        getResponsePayload: (p: T) => Promise<K> | K
    ) {
        try {
            const payload = await getRequestBody(req);
            sendSuccessResponse(res, await getResponsePayload(payload));
        } catch (error) {
            next(handleUnknownError(error));
        }
    }
}