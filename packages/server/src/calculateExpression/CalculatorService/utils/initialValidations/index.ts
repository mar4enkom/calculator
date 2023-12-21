import {Validation} from "@calculator/common";
import {InitialValidationErrorCode} from "../../constants/errorCodes";
import {
    validateParenthesesNesting
} from "./validateParenthesesNesting/validateParenthesesNesting";

export const initialValidations: Validation<InitialValidationErrorCode>[] = [
    {
        validate: validateParenthesesNesting,
        message: "Invalid parentheses nesting",
        code: InitialValidationErrorCode.INVALID_PARENTHESES_NESTING,
    }
]