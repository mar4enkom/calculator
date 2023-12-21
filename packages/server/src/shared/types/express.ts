import { Request as ExpressRequest, Response as ExpressResponse } from 'express';

import { Send, Query } from 'express-serve-static-core';


export interface RestRequestBody<T> extends ExpressRequest {
    body: T
}

export interface RestRequestQuery<T extends Query> extends ExpressRequest {
    query: T
}

export interface RestRequest<T extends Query, U> extends ExpressRequest {
    body: U,
    query: T
}

export interface RestResponse<ResBody> extends ExpressResponse {
    json: Send<ResBody, this>;
}