import {OperationErrorCodes} from "../../../constants/errorCodes.js";
import {stringIsNumber} from "../../../utils/stringIsNumber.js";
import {getValidationErrors} from "Shared/utils/getValidationErrors.js";
import {OperationValidationProvider} from "./OperationValidationProvider.js";

// class for selecting validations for operation from list of prepared validations
export class OperationValidationsSelector extends OperationValidationProvider {
    constructor(operationProps) {
        super(operationProps);
        this.operationProps = operationProps;
    }

    getOperationValidations() {
        const defaultValidations = this.getDefaultValidations();
        const customValidations = this.getCustomValidations();
        const matchedCustomValidations = this.#getMatchedCustomValidations(customValidations);

        return [...defaultValidations, ...matchedCustomValidations]
    }

    /**
     * Retrieves an array of custom validation properties that match the validations specified in customValidations property.
     *
     * @param {Object} operationProps - The properties of the operation, including validations.
     * @returns {Array} An array of custom validation properties.
     * @throws {Error} Throws an error if an unknown validation from config is encountered for the operation.
     */
    #getMatchedCustomValidations(customValidations) {
        if(!this.operationProps.validations) return [];

        const operationValidations = Object.keys(this.operationProps.validations);
        return operationValidations.reduce((acc, validationName) => {
            const validationProps = customValidations.find(v => v.code === validationName);
            if(validationProps) return [...acc, validationProps];
            throw new Error(`Unknown validation ${validationName} for "${this.operationProps.name}" operation`);
        }, []);
    }
}
