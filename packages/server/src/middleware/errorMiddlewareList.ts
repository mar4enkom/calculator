import {errorHandlingMiddleware} from "./errorHandlingMiddleware";
import {notFoundMiddleware} from "./notFoundMiddleware";

export const errorMiddlewareList = [
    errorHandlingMiddleware,
    notFoundMiddleware,
]


