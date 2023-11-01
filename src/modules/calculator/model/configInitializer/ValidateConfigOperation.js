import {stringIsNumber} from "../../../../utils/stringIsNumber.js";
import {getValidationErrors} from "../../../../utils/getValidationErrors.js";

const InitialValidations = {
    NUMBER_OF_ARGUMENTS: "NUMBER_OF_ARGUMENTS",
    NON_NUMERIC_ARGUMENTS: "NON_NUMERIC_ARGUMENTS",
}

const CustomValidations = {
    NON_NEGATIVE_ARGUMENTS: "nonNegativeArguments"
};

export class ValidateConfigOperation {
    static instance;

    static getInstance() {
        if(!ValidateConfigOperation.instance) {
            ValidateConfigOperation.instance = new ValidateConfigOperation();
        }
        return ValidateConfigOperation.instance;
    }
    withValidatedCalc(operation) {
        const initialValidations = this.#getInitialValidations(operation);
        const validationFunctionsList = [
            ...Object.values(initialValidations),
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
        return {
            [InitialValidations.NUMBER_OF_ARGUMENTS]: {
                validate: (...args) => args.length === operation.calc.length,
                errorText: `Invalid number of arguments in "${operation.name}" operation`,
            },
            [InitialValidations.NON_NUMERIC_ARGUMENTS]: {
                validate: (...args) => args.every(a => stringIsNumber(a)),
                errorText: `Non-numeric arguments in "${operation.name}" operation`,
            }
        };
    }
    #getCustomValidations(operation) {
        return {
            [CustomValidations.NON_NEGATIVE_ARGUMENTS]: {
                validate: (...args) => args.every(a => stringIsNumber(a) && +a >= 0),
                errorText: `Arguments of "${operation.name}" operation must be positive`
            }
        }
    }
    #getMatchedCustomValidations(operation) {
        if(!operation.validations) return [];

        const customValidations = this.#getCustomValidations(operation);
        return Object.keys(operation.validations).reduce((acc, validationName) => {
            if(customValidations[validationName] != null) return [...acc, customValidations[validationName]];
            throw new Error(`Unknown validation ${validationName} for "${operation.name}" operation`);
        }, []);
    }
}
