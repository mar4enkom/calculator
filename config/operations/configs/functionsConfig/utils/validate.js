import {composeValidations} from "../../../../../utils/composeValidations.js";

export function validate(funcSign, params = {}) {
    const {
        numberOfArguments,
        extraValidations = []
    } = params;

    const validationFunctions = [
        (...args) => args.length === numberOfArguments || new Error(`Invalid number of arguments`),
        (...args) => args.every(s => !Number.isNaN(s)) || new Error("Invalid arguments"),
    ];

    return (...args) => {
        return composeValidations(
            args,
            ...validationFunctions,
            ...extraValidations
        );
    }
}