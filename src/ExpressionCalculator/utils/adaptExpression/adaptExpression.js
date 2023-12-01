import {compose} from "../../../shared/utils/composeFunctions.js";
import {createMemoRegex} from "../createMemoRegex.js";
import {getOptionalParenthesesRegex} from "../createRegex/getOptionalParenthesesRegex.js";
import {getPrefixFunctionNamesRegex} from "../createRegex/getPrefixFunctionNamesRegex.js";
import {Regex} from "../../constants/regex.js";
import {parenthesize} from "../parenthesize.js";
import {getFirstMatch} from "../../../shared/utils/regexUtils/getFirstMatch.js";

export function adaptExpression(expression, operations) {
    const adaptExpression = compose(functionOptionalParenthesesAdapter);

    return adaptExpression(expression, operations);
}

function functionOptionalParenthesesAdapter(expression, operations) {
    const optionalParenthesesRegex = createMemoRegex(getOptionalParenthesesRegex(operations));
    const prefixFunctionNamesRegex = createMemoRegex(getPrefixFunctionNamesRegex(operations));

    let currentExpression = expression;

    while(true) {
        const matchedExpr = getFirstMatch(optionalParenthesesRegex, currentExpression);
        if(matchedExpr == null) return currentExpression;

        const operand = getFirstMatch(Regex.FLOAT_NUMBER, matchedExpr);
        const operationSign = matchedExpr.replace(operand, "");

        let updatedExpr;
        if(getFirstMatch(prefixFunctionNamesRegex, matchedExpr) != null) {
            updatedExpr = operationSign.concat(parenthesize(operand));
        } else {
            updatedExpr = parenthesize(operand).concat(operationSign);
        }
        currentExpression = currentExpression.replace(matchedExpr, updatedExpr);
    }

    return currentExpression;
}