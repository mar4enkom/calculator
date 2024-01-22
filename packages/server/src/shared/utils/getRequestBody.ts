import {RestRequest} from "@/shared/types/express";

export function getRequestBody<T>(
    req: RestRequest<T>
): T {
    if(req.query != null && Object.keys(req.query).length > 0) {
        return req.query as T;
    } else if(req.body != null) {
        return req.body as T;
    } else {
        throw new Error("Body and query fields of request are empty");
    }
}