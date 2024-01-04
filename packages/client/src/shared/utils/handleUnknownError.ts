import {ServerMultiError} from "../helpers/ServerMultiError";

export function handleUnknownError(error: unknown): ServerMultiError {
    return new ServerMultiError([{code: "unknown_error", message: "Unknown error"}]);
}