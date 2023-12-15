import { Send, Query } from 'express-serve-static-core';
import {ApiResponse} from "@calculator/common";

export interface TRequestBody<T> extends Express.Request {
    body: T
}

export interface TRequestQuery<T extends Query> extends Express.Request {
    query: T
}

export interface TRequest<T extends Query, U> extends Express.Request {
    body: U,
    query: T
}

export interface TResponse<ResBody> extends Express.Response {
    json: Send<ResBody, this>;
}