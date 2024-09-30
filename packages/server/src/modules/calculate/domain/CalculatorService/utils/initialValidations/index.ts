import {Symbols, Validation} from "@calculator/common";
import {
    validateParenthesesNesting
} from "./validateParenthesesNesting/validateParenthesesNesting";
import {InitialValidationErrorCode} from "@/calculate/domain/CalculatorService/constants/errorCodes";

type GetInitialValidationsReturn = Validation<InitialValidationErrorCode>[];

export const getInitialValidations = (symbols: Symbols): GetInitialValidationsReturn => {
    return [
        {
            validate: (expression: string) => validateParenthesesNesting(expression, symbols),
            message: "Invalid parentheses nesting",
            code: InitialValidationErrorCode.INVALID_PARENTHESES_NESTING,
        }
    ]
}