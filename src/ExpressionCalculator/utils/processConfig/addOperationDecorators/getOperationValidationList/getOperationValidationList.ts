import {CalculateExpressionFunction, Operation} from "userConfig/operations/types";
import {OperationErrorCode} from "calculatorService/constants/errorCodes";
import {stringIsNumber} from "calculatorService/utils/stringIsNumber";
import {Validation} from "shared/utils/getValidationErrors";

export type OperationValidation = Validation<OperationErrorCode>;
type OperationValidationList = OperationValidation[];

export function getOperationValidationList(operationProps: Operation): OperationValidationList {
    const defaultValidations = getDefaultValidations(operationProps);
    const customValidations = getCustomValidations(operationProps);
    const matchedCustomValidations = getMatchedCustomValidations(customValidations, operationProps);

    return [...defaultValidations, ...matchedCustomValidations]
}

// Retrieves an array of custom validation properties that match the validations specified in customValidations property.
function getMatchedCustomValidations(customValidations: OperationValidationList, operationProps: Operation): OperationValidationList {
    if(operationProps.validations == null) return [];

    const operationValidations = Object.keys(operationProps.validations);
    return operationValidations.reduce((acc: OperationValidationList, validationName) => {
        const validationProps = customValidations.find(v => v.code === validationName);
        if(validationProps != null) {
            return [...acc, validationProps];
        } else {
            throw new Error(`Unknown validation ${validationName} for "${operationProps.name}" operation`);
        }
    }, []);
}

function getDefaultValidations(operationProps: Operation): OperationValidationList {
    return [
        {
            validate: (...args) => args.length === operationProps.calculateExpression.length,
            message: `Invalid number of arguments in "${operationProps.name}" operation`,
            code: "NUMBER_OF_ARGUMENTS",
        }
    ]
}

function getCustomValidations(operationProps: Operation): OperationValidationList {
    return [
        {
            validate: (...args) => {
                if(args.some(el => !stringIsNumber(el))) return true;
                return args.every(a => +a >= 0)
            },
            message: `Arguments of "${operationProps.name}" operation must be positive`,
            code: "nonNegativeArguments"
        },
        {
            validate: (...args) => {
                return args.length === 2 && args[1] !== 0;
            },
            message: `Division by zero is not allowed`,
            code: "disableZeroDivision"
        }
    ]
}