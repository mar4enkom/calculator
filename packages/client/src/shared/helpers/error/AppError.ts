import {ErrorBody} from "@calculator/common";
import {ErrorCodes} from "../../contstants/clientErrors";

export class AppError extends Error {
    readonly errors: ErrorBody;
    readonly code: ErrorCodes;
    constructor(errors: ErrorBody = [], code: ErrorCodes = ErrorCodes.UNKNOWN_APP_ERROR) {
        super();
        this.errors = errors;
        this.code = code;

        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this);
    }
}