import {composeValidations} from "../../../utils/composeValidations.js";

export function validate(funcSign, params = {}) {
    const {
        numberOfArguments,
        extraValidations = []
    } = params;

    const validationFunctions = [
        (expr) => expr.split(',').length === numberOfArguments || new Error(`Invalid number of arguments`),
        (expr) => expr.split(',').every(s => !Number.isNaN(s)) || new Error("Invalid arguments")
    ];

    return (expr) => composeValidations(
        expr,
        ...validationFunctions,
        ...extraValidations
    )
}