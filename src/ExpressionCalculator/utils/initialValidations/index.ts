import {Validation} from "shared/utils/getValidationErrors";
import {InitialValidationErrorsCodes} from "calculatorService/constants/errorCodes";
import {
    validateParenthesesNesting
} from "calculatorService/utils/initialValidations/validateParenthesesNesting/validateParenthesesNesting";

export const initialValidations: Validation<InitialValidationErrorsCodes>[] = [
    {
        validate: validateParenthesesNesting,
        message: "Invalid parentheses nesting",
        code: InitialValidationErrorsCodes.INVALID_PARENTHESES_NESTING,
    }
]