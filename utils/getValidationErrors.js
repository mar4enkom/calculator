export function getValidationErrors(args, ...validationFuncList) {
    return validationFuncList.reduce((acc, validationItem) => {
        const validationResult = validationItem.validate(...args);
        if(!validationResult) return [...acc, validationItem.errorText];
        return acc;
    }, []);
}