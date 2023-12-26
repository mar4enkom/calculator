import cors from "cors";
import bodyParser from "body-parser";
import {errorHandlingMiddleware} from "./errorHandlingMiddleware";
import {notFoundMiddleware} from "./notFoundMiddleware";

export const initialMiddlewareList = [
    cors(),
    bodyParser.json()
];

export const errorMiddlewareList = [
    errorHandlingMiddleware,
    notFoundMiddleware,
]


