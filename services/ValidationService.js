import {Symbols} from "../constants.js";

export class ValidationService {
    constructor() {
        if (!ValidationService.instance) {
            ValidationService.instance = this;
        }
        return ValidationService.instance;
    }

    validateExpression(expression) {
        return this.#composeValidations(
            expression,
            this.#isAllParenthesisClosed
        );
    }

    #composeValidations(expression, ...validationFuncList) {
        for(let validationFunc of validationFuncList) {
            const validationResult = validationFunc(expression);
            if(validationResult instanceof Error) return validationResult;
        }
    }

    #isAllParenthesisClosed(exp) {
        const lpCount = exp.split('').filter(char => char === Symbols.LP).length;
        const rpCount = exp.split('').filter(char => char === Symbols.RP).length;
        return lpCount === rpCount || new Error("All parenthesis must be closed.");
    }
}