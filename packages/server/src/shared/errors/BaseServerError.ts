import {HttpStatusCodes} from "../constants/httpStatusCodes";

export abstract class BaseServerError extends Error {
    readonly httpCode: HttpStatusCodes;
    readonly isCritical: boolean;

    constructor(httpCode: HttpStatusCodes, isCritical: boolean = false, message?: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);

        this.httpCode = httpCode;
        this.isCritical = isCritical;

        Error.captureStackTrace(this);
    }
}