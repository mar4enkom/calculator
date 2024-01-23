import {NextFunction, Request as ExpressRequest, Response as ExpressResponse} from 'express';

import { Send } from 'express-serve-static-core';
import {ApiFailResponse, ApiSuccessResponse} from "@calculator/common";

export interface RestRequestBody<T> extends ExpressRequest {
    body: T,
    query: {}
}


// @ts-ignore
export interface RestRequestQuery<T> extends ExpressRequest {
    query: T,
    body: {},
}


export type RestRequest<T = any> =
    RestRequestBody<T> | RestRequestQuery<T>;

type DefaultErrorBody = Array<{
    code: string;
    message: string;
}>

export interface RestResponse<SuccessBody, ErrBody = DefaultErrorBody> extends ExpressResponse {
    json: Send<ApiSuccessResponse<SuccessBody> | ApiFailResponse<ErrBody>, this>;
}

export type ExpressParams<T, K> = [
    RestRequestBody<T>,
    RestResponse<K>,
    NextFunction,
];