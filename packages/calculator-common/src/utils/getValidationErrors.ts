import {Validation} from "../types/common/common";

import {CustomErrorType} from "../types/common/errors";

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