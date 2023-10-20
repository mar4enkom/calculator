export function composeValidations(args, ...validationFuncList) {
    for(let validationFunc of validationFuncList) {
        const validationResult = validationFunc(...args);
        if(validationResult instanceof Error) return validationResult;
    }
}