export function getValidationErrors(args, ...validationFuncList) {
    return validationFuncList.reduce((acc, validationItem) => {
        const validationResult = validationItem.validate(...args);
        const { message, code } = validationItem;
        if(!validationResult) return [...acc, { message, code }];
        return acc;
    }, []);
}