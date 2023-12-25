import {getFirstMatch, Symbols} from "@calculator/common";
import {Regex} from "../../../constants/regex";

export function validateParenthesesNesting(expression: string): boolean {
    let currentExpression = expression;
    let matchedParenthesesExpression;
    while ((matchedParenthesesExpression = getFirstMatch(Regex.NESTING_WITHOUT_PARENTHESES, currentExpression)) != null) {
        currentExpression = currentExpression.replace(matchedParenthesesExpression, "");
    }
    return !(currentExpression.includes(Symbols.LP) || currentExpression.includes(Symbols.RP))
}