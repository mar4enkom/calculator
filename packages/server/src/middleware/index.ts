import express from "express";
import cors from "cors";
import {errorHandlingMiddleware} from "./errorHandlingMiddleware";
import {notFoundMiddleware} from "./notFoundMiddleware";

export const initialMiddlewareList = [
    cors(),
    express.json()
];

export const errorMiddlewareList = [
    notFoundMiddleware,
    errorHandlingMiddleware,
]


