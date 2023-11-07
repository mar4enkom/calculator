import {Symbols} from "../../../../../userConfig/operations/constants/constants.js";
import {getValidationErrors} from "../../shared/utils/getValidationErrors.js";
import {validateParenthesesNesting} from "../utils/validateParenthesesNesting/validateParenthesesNesting.js";
import {ValidationErrorsCodes} from "../constants/errorsCodes.js";

export class ValidationService {
    static instance;

    #validations = [
        {
            validate: validateParenthesesNesting,
            message: "Invalid parentheses nesting",
            code: ValidationErrorsCodes.INVALID_PARENTHESES_NESTING,
        }
    ]

    static getInstance() {
        if(!ValidationService.instance) {
            ValidationService.instance = new ValidationService();
        }
        return ValidationService.instance;
    }

    getValidationErrors(expression) {
        return getValidationErrors(
            [expression],
            ...this.#validations,
        );
    }
}