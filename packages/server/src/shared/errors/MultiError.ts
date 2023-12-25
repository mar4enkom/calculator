import {BaseServerError} from "./BaseServerError";
import {HttpStatusCodes} from "../constants/httpStatusCodes";
import {CustomErrorType} from "@calculator/common";

interface MultiErrorItem {
    code: string;
    message: string;
}

export class MultiError extends BaseServerError {
    readonly errors: MultiErrorItem[];
    constructor(errors: CustomErrorType[], isCritical = false) {
        super(HttpStatusCodes.BAD_REQUEST, isCritical);
        this.errors = errors;
    }
}