import {Symbols} from "UserConfig/constants/constants.js";
import {getValidationErrors} from "../../shared/utils/getValidationErrors.js";
import {validateParenthesesNesting} from "../utils/validateParenthesesNesting/validateParenthesesNesting.js";
import {ValidationErrorsCodes} from "../constants/errorsCodes.js";

export class InitialValidationService {
    static instance;

    #validations = [
        {
            validate: validateParenthesesNesting,
            message: "Invalid parentheses nesting",
            code: ValidationErrorsCodes.INVALID_PARENTHESES_NESTING,
        }
    ]

    static getInstance() {
        if(!InitialValidationService.instance) {
            InitialValidationService.instance = new InitialValidationService();
        }
        return InitialValidationService.instance;
    }

    getInitialValidationErrors(expression) {
        return getValidationErrors(
            [expression],
            ...this.#validations,
        );
    }
}