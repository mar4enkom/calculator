import {Regex} from "../../../../../constants/regex.js";
import {Symbols} from "../../../../../constants/constants.js";
import {getOptionalParenthesesRegex} from "../regex/getOptionalParenthesesRegex.js";
import {getPrefixFunctionNamesRegex} from "../regex/getPrefixFunctionNamesRegex.js";
import {createRegex} from "../createRegex.js";

export function functionOptionalParenthesesAdapter(expression, operationQueue) {
    const optionalParenthesesRegex = createRegex(getOptionalParenthesesRegex(operationQueue));
    const prefixFunctionNamesRegex = createRegex(getPrefixFunctionNamesRegex(operationQueue));

    const matchedExpr = optionalParenthesesRegex.exec(expression)?.[0];
    if(matchedExpr == null) return expression;

    const operand = Regex.NUMBER.exec(matchedExpr)?.[0];
    const operationSign = matchedExpr.replace(operand, "");

    let result;
    if(prefixFunctionNamesRegex.exec(expression)?.[0] != null) {
        result = operationSign.concat(`${Symbols.LP}${operand}${Symbols.RP}`);
    } else {
        result = `${Symbols.LP}${operand}${Symbols.RP}`.concat(operationSign);
    }

    return expression.replace(matchedExpr, result);
}
