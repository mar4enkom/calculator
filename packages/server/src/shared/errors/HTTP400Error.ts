import {BaseServerError} from "./BaseServerError";
import {HttpStatusCodes} from "../constants/httpStatusCodes";

export class HTTP400Error extends BaseServerError {
    constructor(isCritical: boolean = false, message: string | undefined = "Bad request") {
        super(HttpStatusCodes.BAD_REQUEST, isCritical, message);
    }
}