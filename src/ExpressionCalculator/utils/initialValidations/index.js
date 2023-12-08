import {InitialValidationErrorsCodes} from "CalculatorService/constants/errorCodes.js";
import {validateParenthesesNesting} from "CalculatorService/utils/initialValidations/validateParenthesesNesting/validateParenthesesNesting.js";

export const initialValidations = [
    {
        validate: validateParenthesesNesting,
        message: "Invalid parentheses nesting",
        code: InitialValidationErrorsCodes.INVALID_PARENTHESES_NESTING,
    }
]