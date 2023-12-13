import {CalculateExpressionFunction} from "userConfig/operations/types";
import {ErrorCode} from "calculatorService/constants/errorCodes";
import {CustomErrorType} from "shared/types/calculationResult";

export type Validation<ErrorCode extends string = string> = {
    validate: (...args: Parameters<CalculateExpressionFunction>) => boolean;
    message: string;
    code: ErrorCode;
}

export function getValidationErrors<T extends string = string>(
    args: any,
    ...validationFuncList: Validation<T>[]
): CustomErrorType<T>[] {
    const argsArr = Array.isArray(args) ? args : [args];
    return validationFuncList.reduce((acc: CustomErrorType<T>[], validationItem) => {
        const isValid = validationItem.validate(...argsArr);
        if(!isValid) {
            const { message, code } = validationItem;
            return [...acc, { message, code }]
        };
        return acc;
    }, []);
}