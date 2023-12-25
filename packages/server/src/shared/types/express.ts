import { Request as ExpressRequest, Response as ExpressResponse } from 'express';

import { Send, Query } from 'express-serve-static-core';


export interface RestRequestBody<T> extends ExpressRequest {
    body: T
}

export interface RestRequestQuery<T extends Query> extends ExpressRequest {
    query: T
}

export interface RestRequest<T extends Query = any, U = any> extends ExpressRequest {
    body: U,
    query: T
}

type DefaultErrorBody = Array<{
    code: string;
    message: string;
}>

export interface RestResponse<SuccessBody = any, ErrBody = DefaultErrorBody> extends ExpressResponse {
    json: Send<SuccessBody | ErrBody, this>;
}