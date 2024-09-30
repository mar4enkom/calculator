import {RestRequest, RestRequestBody, RestResponse} from "@/shared/types/express";
import {NextFunction} from "express";
import {getRequestBody} from "@/shared/utils/getRequestBody";
import {sendSuccessResponse} from "@/shared/utils/sendResponse";
import {handleUnknownError} from "@/shared/utils/handleUnknownError";
import {zParse} from "@/shared/utils/zParse";
import {AnyZodObject} from "zod";

export type ExpressCallback<Response, Payload> = (
    req: RestRequestBody<Payload>,
    res: RestResponse<Response>,
    next: NextFunction
) => Promise<void> | void;

export interface ActionProps<RequestPayload> {
    customValidation?(p: RequestPayload): void;
    zodValidation?: AnyZodObject;
}

export type AsyncCallback<Response, Payload> = (a: Payload) => Promise<Response> | Response;

export async function handleExpressAction<Response, Payload>(
    req: RestRequest<Payload>,
    res: RestResponse<Response>,
    next: NextFunction,
    asyncCallback: (a: Payload) => Promise<Response> | Response,
    props?: ActionProps<Payload>
) {
    try {
        const requestBody = getRequestBody(req);
        if(props?.zodValidation != null) {
            zParse(props.zodValidation, requestBody!)
        }
        props?.customValidation?.(requestBody);

        const response = await asyncCallback(requestBody);
        sendSuccessResponse(res, response);
    } catch (error) {
        next(handleUnknownError(error));
    }
}

export function createExpressAction<Response, Payload>(
    asyncCallback: (a: Payload) => Promise<Response> | Response,
    props?: ActionProps<Payload>
): ExpressCallback<Response, Payload> {
    return (req: RestRequest<Payload>, res: RestResponse<Response>, next: NextFunction): void => {
        handleExpressAction(req, res, next, asyncCallback, props);
    }
}
