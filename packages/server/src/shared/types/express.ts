import { Request as ExpressRequest, Response as ExpressResponse } from 'express';

import { Send, Query } from 'express-serve-static-core';
import {ApiFailResponse, ApiSuccessResponse} from "@calculator/common";


export interface RestRequestBody<T> extends ExpressRequest {
    body: T,
    query: {}
}

export interface RestRequestQuery<T extends Query> extends ExpressRequest {
    query: T,
    body: {},
}


export type RestRequest<B = any, Q extends Query = any> =
    RestRequestBody<B> | RestRequestQuery<Q>;

type DefaultErrorBody = Array<{
    code: string;
    message: string;
}>

export interface RestResponse<SuccessBody, ErrBody = DefaultErrorBody> extends ExpressResponse {
    json: Send<ApiSuccessResponse<SuccessBody> | ApiFailResponse<ErrBody>, this>;
}