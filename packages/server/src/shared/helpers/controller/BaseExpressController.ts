import {RestRequest, RestResponse} from "@/shared/types/express";
import {NextFunction} from "express";
import {getRequestBody} from "@/shared/utils/getRequestBody";
import {sendSuccessResponse} from "@/shared/utils/sendResponse";
import {handleUnknownError} from "@/shared/utils/handleUnknownError";
import {zParse} from "@/shared/utils/zParse";
import {AnyZodObject} from "zod";

export interface OrmMethodProps<RequestPayload, PayloadBefore = any> {
    before?(p: RequestPayload): void;
    zodValidation?: AnyZodObject;
    transformBefore?(valueBefore: PayloadBefore): Promise<RequestPayload>;
}

export async function handleRequest<Response, RequestPayload, PayloadBefore = any>(
    asyncCallback: (a: RequestPayload) => Promise<Response> | Response,
    payload: PayloadBefore,
    props?: OrmMethodProps<RequestPayload, PayloadBefore>
): Promise<Response> {
    if(props?.zodValidation != null) {
        zParse(props.zodValidation, payload!)
    }

    const transformedPayload = (props?.transformBefore?.(payload) ?? payload) as RequestPayload;
    props?.before?.(transformedPayload);

    return await asyncCallback(transformedPayload);
}

export async function handleExpressRequest<Response, Payload>(
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