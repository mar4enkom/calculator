import {CustomErrorType} from "@calculator/common";
import {ErrorCodes} from "../constants/errorCodes";

export class CustomError {
    errors: CustomErrorType<ErrorCodes>[];
    constructor(errors: CustomErrorType<ErrorCodes> | CustomErrorType<ErrorCodes>[]) {
        if(Array.isArray(errors)) {
            this.errors = errors;
        } else {
            this.errors = [errors];
        }
    }
}