import {Symbols} from "../constants/constants.js";
import {composeValidations} from "../utils/composeValidations.js";

export class ValidationService {
    static instance;

    static getInstance() {
        if(!ValidationService.instance) {
            ValidationService.instance = new ValidationService();
        }
        return ValidationService.instance;
    }

    validate(expression) {
        return composeValidations(
            [expression],
            this.#isAllParenthesisClosed
        );
    }

    #isAllParenthesisClosed(exp) {
        const lpCount = exp.split('').filter(char => char === Symbols.LP).length;
        const rpCount = exp.split('').filter(char => char === Symbols.RP).length;
        return lpCount === rpCount || new Error("All parenthesis must be closed.");
    }
}