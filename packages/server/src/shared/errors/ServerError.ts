import {BaseServerError} from "./BaseServerError";
import {HttpStatusCodes} from "../constants/httpStatusCodes";
import {ServerErrorCodes} from "../constants/serverErrors";

export class ServerError extends BaseServerError {
    readonly errorCode: string;
    constructor(
        httpCode: HttpStatusCodes = HttpStatusCodes.INTERNAL_SERVER_ERROR,
        errorCode: string = ServerErrorCodes.UNKNOWN_SERVER_ERROR,
        message?: string,
        isCritical?: boolean
    ) {
        super(httpCode, isCritical, message);

        this.errorCode = errorCode;
    }
}