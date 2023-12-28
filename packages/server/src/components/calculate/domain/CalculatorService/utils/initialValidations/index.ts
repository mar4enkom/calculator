import {Symbols, Validation} from "@calculator/common";
import {InitialValidationErrorCode} from "../../constants/errorCodes";
import {
    validateParenthesesNesting
} from "./validateParenthesesNesting/validateParenthesesNesting";

export const getInitialValidations: (a: Symbols) => Validation<InitialValidationErrorCode>[] = (symbols: Symbols) => {
    return [
        {
            validate: (expression: string) => validateParenthesesNesting(expression, symbols),
            message: "Invalid parentheses nesting",
            code: InitialValidationErrorCode.INVALID_PARENTHESES_NESTING,
        }
    ]
}