export function composeValidations(expression, ...validationFuncList) {
    for(let validationFunc of validationFuncList) {
        const validationResult = validationFunc(expression);
        if(validationResult instanceof Error) return validationResult;
    }
}