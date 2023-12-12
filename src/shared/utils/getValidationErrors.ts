import {CustomErrorType} from "calculatorService/types/errors";
import {CalculateExpressionFunction} from "userConfig/operations/types";

export type Validation<ErrorCodes extends string = string> = {
    validate: (...args: Parameters<CalculateExpressionFunction>) => boolean;
    message: string;
    code: ErrorCodes;
}

export function getValidationErrors<ErrorCodes extends string = string>(
    args: any,
    ...validationFuncList: Validation<ErrorCodes>[]
): CustomErrorType<ErrorCodes>[] {
    const argsArr = Array.isArray(args) ? args : [args];
    return validationFuncList.reduce((acc: CustomErrorType<ErrorCodes>[], validationItem) => {
        const isValid = validationItem.validate(...argsArr);
        if(!isValid) {
            const { message, code } = validationItem;
            return [...acc, { message, code }]
        };
        return acc;
    }, []);
}