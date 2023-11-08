import {stringIsNumber} from "../utils/stringIsNumber.js";
import {getValidationErrors} from "../../shared/utils/getValidationErrors.js";
import {OperationErrorCodes} from "../constants/errorCodes.js";
import {Operations} from "../../../../../userConfig/operations/constants/operations.js";
import {Symbols} from "../../../../../userConfig/operations/constants/constants.js";

export class OperationValidator {
    static instance;

    static getInstance() {
        if(!OperationValidator.instance) {
            OperationValidator.instance = new OperationValidator();
        }
        return OperationValidator.instance;
    }
    withValidatedCalc(operation) {
        const initialValidations = this.#getDefaultValidations(operation);
        const validationFunctionsList = [
            ...initialValidations,
            ...this.#getMatchedCustomValidations(operation),
        ];
        return {
            ...operation,
            calc(...args) {
                const errors = getValidationErrors(args, ...validationFunctionsList);
                if(errors.length > 0) return { errors }
                return operation.calc(...args);
            }
        }
    }
    #getDefaultValidations(operation) {
        return [
            {
                validate: (...args) => args.length === operation.calc.length,
                message: `Invalid number of arguments in "${operation.name}" operation`,
                code: OperationErrorCodes.NUMBER_OF_ARGUMENTS,
            }
        ].filter(op => op.enabled === true || op.enabled == null);
    }
    #getCustomValidations(operation) {
        return [
            {
                validate: (...args) => {
                    if(args.some(el => !stringIsNumber(el))) return true;
                    return args.every(a => +a >= 0)
                },
                message: `Arguments of "${operation.name}" operation must be positive`,
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
    #getMatchedCustomValidations(operation) {
        if(!operation.validations) return [];

        const customValidations = this.#getCustomValidations(operation);
        return Object.keys(operation.validations).reduce((acc, validationName) => {
            const validationProps = customValidations.find(v => v.code === validationName);
            if(validationProps) return [...acc, validationProps];
            throw new Error(`Unknown validation ${validationName} for "${operation.name}" operation`);
        }, []);
    }
}
