import {OperationErrorCodes} from "CalculatorService/constants/errorCodes.js";
import {stringIsNumber} from "CalculatorService/utils/stringIsNumber.js";

export function getOperationValidationList(operationProps) {
    const defaultValidations = getDefaultValidations(operationProps);
    const customValidations = getCustomValidations(operationProps);
    const matchedCustomValidations = getMatchedCustomValidations(customValidations, operationProps);

    return [...defaultValidations, ...matchedCustomValidations]
}

/**
 * Retrieves an array of custom validation properties that match the validations specified in customValidations property.
 *
 * @param {Object} operationProps - The properties of the operation, including validations.
 * @returns {Array} An array of custom validation properties.
 * @throws {Error} Throws an error if an unknown validation from config is encountered for the operation.
 */
function getMatchedCustomValidations(customValidations, operationProps) {
    if(!operationProps.validations) return [];

    const operationValidations = Object.keys(operationProps.validations);
    return operationValidations.reduce((acc, validationName) => {
        const validationProps = customValidations.find(v => v.code === validationName);
        if(validationProps) return [...acc, validationProps];
        throw new Error(`Unknown validation ${validationName} for "${operationProps.name}" operation`);
    }, []);
}

function getDefaultValidations(operationProps) {
    return [
        {
            validate: (...args) => args.length === operationProps.calculateExpression.length,
            message: `Invalid number of arguments in "${operationProps.name}" operation`,
            code: OperationErrorCodes.NUMBER_OF_ARGUMENTS,
        }
    ]
}

function getCustomValidations(operationProps) {
    return [
        {
            validate: (...args) => {
                if(args.some(el => !stringIsNumber(el))) return true;
                return args.every(a => +a >= 0)
            },
            message: `Arguments of "${operationProps.name}" operation must be positive`,
            code: OperationErrorCodes.NON_NEGATIVE_ARGUMENTS
        },
        {
            validate: (...args) => {
                return args[1] !== 0;
            },
            message: `Division by zero is not allowed`,
            code: OperationErrorCodes.ZERO_DIVISION
        }
    ]
}