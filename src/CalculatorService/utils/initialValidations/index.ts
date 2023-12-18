import {Validation} from "shared/utils/getValidationErrors";
import {InitialValidationErrorCode} from "calculatorService/constants/errorCodes";
import {
    validateParenthesesNesting
} from "calculatorService/utils/initialValidations/validateParenthesesNesting/validateParenthesesNesting";

export const initialValidations: Validation<InitialValidationErrorCode>[] = [
    {
        validate: validateParenthesesNesting,
        message: "Invalid parentheses nesting",
        code: InitialValidationErrorCode.INVALID_PARENTHESES_NESTING,
    }
]