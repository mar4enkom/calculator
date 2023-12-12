import {CustomErrorType} from "calculatorService/types/errors";

export class CustomError<T extends string = string> {
    errors: CustomErrorType<T>[];
    constructor(errors: CustomErrorType<T> | CustomErrorType<T>[]) {
        this.errors = Array.isArray(errors) ? errors : [errors];
    }
}