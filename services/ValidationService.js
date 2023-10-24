import {Symbols} from "../constants/constants.js";
import {composeValidations} from "../utils/composeValidations.js";

export class ValidationService {
    constructor() {
        if (!ValidationService.instance) {
            ValidationService.instance = this;
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