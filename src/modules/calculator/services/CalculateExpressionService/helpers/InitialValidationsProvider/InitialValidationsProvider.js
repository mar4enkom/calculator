import {InitialValidationErrorsCodes} from "../../constants/errorCodes.js";
import {getFirstMatch} from "../../../../shared/utils/regexUtils/getFirstMatch.js";
import {Regex} from "../../constants/regex.js";
import {Symbols} from "UserConfig/constants/constants.js";

export class InitialValidationsProvider {
    static validations = [
        {
            validate: InitialValidationsProvider.validateParenthesesNesting,
            message: "Invalid parentheses nesting",
            code: InitialValidationErrorsCodes.INVALID_PARENTHESES_NESTING,
        }
    ]

    //TODO: make it private when translate to TypeScript
    static validateParenthesesNesting(expression) {
        let currentExpression = expression;
        let matchedParenthesesExpression;
        while ((matchedParenthesesExpression = getFirstMatch(Regex.NESTING_WITHOUT_PARENTHESES, currentExpression)) != null) {
            currentExpression = currentExpression.replace(matchedParenthesesExpression, "");
        }
        return !(currentExpression.includes(Symbols.LP) || currentExpression.includes(Symbols.RP))
    }
}