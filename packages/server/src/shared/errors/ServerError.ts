import {BaseServerError} from "./BaseServerError";
import {HttpStatusCodes} from "../constants/httpStatusCodes";

export class ServerError extends BaseServerError {
    readonly errorCode: string;
    constructor(httpCode: HttpStatusCodes, errorCode: string, message: string, isCritical: boolean = false,) {
        super(httpCode, isCritical, message);

        this.errorCode = errorCode;
    }
}