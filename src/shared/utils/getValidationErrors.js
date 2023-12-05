export function getValidationErrors(args, ...validationFuncList) {
    const argsArr = Array.isArray(args) ? args : [args];
    return validationFuncList.reduce((acc, validationItem) => {
        const isValid = validationItem.validate(...argsArr);
        if(!isValid) {
            const { message, code } = validationItem;
            return [...acc, { message, code }]
        };
        return acc;
    }, []);
}