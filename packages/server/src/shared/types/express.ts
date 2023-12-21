import { Send, Query } from 'express-serve-static-core';

export interface RequestBody<T> extends Express.Request {
    body: T
}

export interface RequestQuery<T extends Query> extends Express.Request {
    query: T
}

export interface Request<T extends Query, U> extends Express.Request {
    body: U,
    query: T
}

export interface Response<ResBody> extends Express.Response {
    json: Send<ResBody, this>;
}