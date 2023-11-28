import {Regex} from "../../../services/CalculateExpressionService/index.js";
import {Symbols} from "UserConfig/constants/constants.js";
import {getFirstMatch} from "../../../shared/utils/regexUtils/getFirstMatch.js";

export function validateParenthesesNesting(expression) {
    let currentExpression = expression;
    let matchedParenthesesExpression;
    while ((matchedParenthesesExpression = getFirstMatch(Regex.NESTING_WITHOUT_PARENTHESES, currentExpression)) != null) {
        currentExpression = currentExpression.replace(matchedParenthesesExpression, "");
    }
    return !(currentExpression.includes(Symbols.LP) || currentExpression.includes(Symbols.RP))
}
