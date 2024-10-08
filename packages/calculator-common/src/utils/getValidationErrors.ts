import {Validation} from "../types/common/common";

import {CustomErrorType} from "../types/common/errors";

export function getValidationErrors<T extends string = string>(
    args: any,
    ...validationFuncList: Validation<T>[]
): CustomErrorType<T>[] | undefined {
    const argsArr = Array.isArray(args) ? args : [args];
    const validationErrors = validationFuncList.reduce((acc: CustomErrorType<T>[], validationItem) => {
        const isValid = validationItem.validate(...argsArr);
        if(!isValid) {
            const { message, code } = validationItem;
            return [...acc, { message, code }]
        };
        return acc;
    }, []);
    return validationErrors.length > 0 ? validationErrors : undefined;
}