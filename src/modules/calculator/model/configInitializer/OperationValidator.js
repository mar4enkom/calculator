import {stringIsNumber} from "../../../../utils/stringIsNumber.js";
import {getValidationErrors} from "../../../../utils/getValidationErrors.js";
import {OperationErrorCodes} from "../constants/errorCodes.js";

export class OperationValidator {
    static instance;

    static getInstance() {
        if(!OperationValidator.instance) {
            OperationValidator.instance = new OperationValidator();
        }
        return OperationValidator.instance;
    }
    withValidatedCalc(operation) {
        const initialValidations = this.#getInitialValidations(operation);
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
    #getInitialValidations(operation) {
        return [
            {
                validate: (...args) => args.length === operation.calc.length,
                message: `Invalid number of arguments in "${operation.name}" operation`,
                code: OperationErrorCodes.NUMBER_OF_ARGUMENTS,
            },
            {
                validate: (...args) => args.every(a => stringIsNumber(a)),
                message: `Non-numeric arguments in "${operation.name}" operation`,
                code: OperationErrorCodes.NON_NUMERIC_ARGUMENTS,
            }
        ];
    }
    #getCustomValidations(operation) {
        return [
            {
                validate: (...args) => args.every(a => stringIsNumber(a) && +a >= 0),
                message: `Arguments of "${operation.name}" operation must be positive`,
                code: OperationErrorCodes.NON_NEGATIVE_ARGUMENTS
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
