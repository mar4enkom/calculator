import {ErrorBody} from "@calculator/common";

export class ServerMultiError extends Error {
    readonly errors: ErrorBody;
    constructor(errors: ErrorBody) {
        super();
        this.errors = errors;

        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this);
    }
}