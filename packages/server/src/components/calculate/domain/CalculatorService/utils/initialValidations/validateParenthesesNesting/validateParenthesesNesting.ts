import {getFirstMatch, Symbols} from "@calculator/common";
import {RegexMap} from "../../../constants/regexMap";

export function validateParenthesesNesting(expression: string, symbols: Symbols): boolean {
    let currentExpression = expression;
    let matchedParenthesesExpression;
    while ((matchedParenthesesExpression = getFirstMatch(RegexMap.NESTING_WITHOUT_PARENTHESES, currentExpression)) != null) {
        currentExpression = currentExpression.replace(matchedParenthesesExpression, "");
    }
    return !(currentExpression.includes(symbols.LP) || currentExpression.includes(symbols.RP))
}