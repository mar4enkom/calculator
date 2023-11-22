export function getValidationErrors(args, ...validationFuncList) {
    return validationFuncList.reduce((acc, validationItem) => {
        const isValid = validationItem.validate(...args);
        if(!isValid) {
            const { message, code } = validationItem;
            return [...acc, { message, code }]
        };
        return acc;
    }, []);
}