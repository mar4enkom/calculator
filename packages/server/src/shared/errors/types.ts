import {MultiError} from "./MultiError";
import {ServerError} from "./ServerError";

export type AppError = MultiError | ServerError;