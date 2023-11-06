import {Symbols} from "../../../../../userConfig/operations/constants/constants.js";
import {getValidationErrors} from "../../shared/utils/getValidationErrors.js";

export class ValidationService {
    static instance;

    #isAllParenthesisClosed = {
        validate: (exp) => exp.split(Symbols.LP).length === exp.split(Symbols.RP).length,
        errorText: "All parenthesis must be closed."
    }

    static getInstance() {
        if(!ValidationService.instance) {
            ValidationService.instance = new ValidationService();
        }
        return ValidationService.instance;
    }

    getValidationErrors(expression) {
        return getValidationErrors(
            [expression],
            this.#isAllParenthesisClosed,
        );
    }
}