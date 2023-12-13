import {ErrorCode} from "calculatorService/constants/errorCodes";
import {CustomErrorType} from "shared/types/calculationResult";

export class CustomError {
    errors: CustomErrorType<ErrorCode>[];
    constructor(errors: CustomErrorType<ErrorCode> | CustomErrorType<ErrorCode>[]) {
        if(Array.isArray(errors)) {
            this.errors = errors;
        } else {
            this.errors = [errors];
        }
    }
}