import {Symbols} from "../../../constants/constants.js";
import {getValidationErrors} from "../../../utils/getValidationErrors.js";

export class ValidationService {
    static instance;

    #isAllParenthesisClosed = {
        validate: (exp) => {
            const lpCount = exp.split('').filter(char => char === Symbols.LP).length;
            const rpCount = exp.split('').filter(char => char === Symbols.RP).length;
            return lpCount === rpCount;
        },
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
            this.#isAllParenthesisClosed
        );
    }
}