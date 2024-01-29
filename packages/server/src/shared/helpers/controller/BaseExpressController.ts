import {RestRequest, RestRequestBody, RestResponse} from "@/shared/types/express";
import {NextFunction} from "express";
import {getRequestBody} from "@/shared/utils/getRequestBody";
import {sendSuccessResponse} from "@/shared/utils/sendResponse";
import {handleUnknownError} from "@/shared/utils/handleUnknownError";
import {zParse} from "@/shared/utils/zParse";
import {AnyZodObject} from "zod";

export type ExpressCallback = (
    req: RestRequestBody<any>,
    res: RestResponse<any>,
    next: NextFunction
) => Promise<void> | void;

export interface OrmMethodProps<RequestPayload> {
    customValidation?(p: RequestPayload): void;
    zodValidation?: AnyZodObject;
}

export async function handleRequest<Response, Payload>(
    asyncCallback: (a: Payload) => Promise<Response> | Response,
    payload: Payload,
    props?: OrmMethodProps<Payload>
): Promise<Response> {
    if(props?.zodValidation != null) {
        zParse(props.zodValidation, payload!)
    }
    props?.customValidation?.(payload);

    return await asyncCallback(payload);
}

export async function handleExpressAction<Response, Payload>(
    req: RestRequest<Payload>,
    res: RestResponse<Response>,
    next: NextFunction,
    asyncCallback: (a: Payload) => Promise<Response> | Response,
    props?: OrmMethodProps<Payload>
) {
    try {
        const requestBody = getRequestBody(req);
        const response = await handleRequest<Response, Payload>(asyncCallback, requestBody, props);
        sendSuccessResponse(res, response);
    } catch (error) {
        next(handleUnknownError(error));
    }
}

export function createExpressAction<Response, Payload>(
    asyncCallback: (a: Payload) => Promise<Response> | Response,
    props?: OrmMethodProps<Payload>
): ExpressCallback {
    return (req: RestRequest<Payload>, res: RestResponse<Response>, next: NextFunction): void => {
        handleExpressAction(req, res, next, asyncCallback, props);
    }
}
