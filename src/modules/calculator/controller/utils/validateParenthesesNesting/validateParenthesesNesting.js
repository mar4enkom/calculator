import {Regex} from "../../../model/index.js";
import {Symbols} from "../../../../../../userConfig/operations/constants/constants.js";

export function validateParenthesesNesting(expression) {
    let currentExpression = expression;
    let matchedParenthesesExpression;
    while ((matchedParenthesesExpression = Regex.NESTING_WITHOUT_PARENTHESES.exec(currentExpression)?.[0]) != null) {
        currentExpression = currentExpression.replace(matchedParenthesesExpression, "");
    }
    return !(currentExpression.includes(Symbols.LP) || currentExpression.includes(Symbols.RP))
}
