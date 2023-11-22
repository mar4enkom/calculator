import {Regex} from "../../constants/regex.js";
import {Symbols} from "UserConfig/constants/constants.js";
import {getOptionalParenthesesRegex} from "../createRegex/getOptionalParenthesesRegex.js";
import {getPrefixFunctionNamesRegex} from "../createRegex/getPrefixFunctionNamesRegex.js";
import {createMemoRegex} from "../createMemoRegex.js";
import {parenthesize} from "../parenthesize.js";
import {getFirstMatch} from "../../../shared/utils/regexUtils/getFirstMatch.js";

export function functionOptionalParenthesesAdapter(expression, operationQueue) {
    const optionalParenthesesRegex = createMemoRegex(getOptionalParenthesesRegex(operationQueue));
    const prefixFunctionNamesRegex = createMemoRegex(getPrefixFunctionNamesRegex(operationQueue));

    const matchedExpr = getFirstMatch(optionalParenthesesRegex, expression);
    if(matchedExpr == null) return expression;

    const operand = getFirstMatch(Regex.FLOAT_NUMBER, matchedExpr);
    const operationSign = matchedExpr.replace(operand, "");

    let updatedExpr;
    if(getFirstMatch(prefixFunctionNamesRegex, expression) != null) {
        updatedExpr = operationSign.concat(parenthesize(operand));
    } else {
        updatedExpr = parenthesize(operand).concat(operationSign);
    }

    return expression.replace(matchedExpr, updatedExpr);
}
