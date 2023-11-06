import {Regex} from "../../constants/regex.js";
import {Symbols} from "../../../../../../userConfig/operations/constants/constants.js";
import {getOptionalParenthesesRegex} from "../regex/getOptionalParenthesesRegex.js";
import {getPrefixFunctionNamesRegex} from "../regex/getPrefixFunctionNamesRegex.js";
import {createMemoRegex} from "../createMemoRegex.js";

export function functionOptionalParenthesesAdapter(expression, operationQueue) {
    const optionalParenthesesRegex = createMemoRegex(getOptionalParenthesesRegex(operationQueue));
    const prefixFunctionNamesRegex = createMemoRegex(getPrefixFunctionNamesRegex(operationQueue));

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
