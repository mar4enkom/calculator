import { Request as ExpressRequest, Response as ExpressResponse } from 'express';

import { Send, Query } from 'express-serve-static-core';
import {ApiFailResponse, ApiSuccessResponse} from "@calculator/common";


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

export interface RestResponse<SuccessBody, ErrBody = DefaultErrorBody> extends ExpressResponse {
    json: Send<ApiSuccessResponse<SuccessBody> | ApiFailResponse<ErrBody>, this>;
}