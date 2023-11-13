import {Regex} from "../../constants/regex.js";
import {Symbols} from "../../../../../../userConfig/operations/constants/constants.js";
import {getOptionalParenthesesRegex} from "../regex/getOptionalParenthesesRegex.js";
import {getPrefixFunctionNamesRegex} from "../regex/getPrefixFunctionNamesRegex.js";
import {createMemoRegex} from "../createMemoRegex.js";
import {parenthesize} from "../parenthesize.js";

export function functionOptionalParenthesesAdapter(expression, operationQueue) {
    const optionalParenthesesRegex = createMemoRegex(getOptionalParenthesesRegex(operationQueue));
    const prefixFunctionNamesRegex = createMemoRegex(getPrefixFunctionNamesRegex(operationQueue));

    const matchedExpr = optionalParenthesesRegex.exec(expression)?.[0];
    if(matchedExpr == null) return expression;

    const operand = Regex.FLOAT_NUMBER.exec(matchedExpr)?.[0];
    const operationSign = matchedExpr.replace(operand, "");

    let updatedExpr;
    if(prefixFunctionNamesRegex.exec(expression)?.[0] != null) {
        updatedExpr = operationSign.concat(parenthesize(operand));
    } else {
        updatedExpr = parenthesize(operand).concat(operationSign);
    }

    return expression.replace(matchedExpr, updatedExpr);
}
