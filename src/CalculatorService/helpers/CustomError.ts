import {ErrorCodes} from "calculatorService/constants/errorCodes";
import {CustomErrorType} from "shared/types/calculationResult";

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