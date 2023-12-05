import {compose} from "@calculator/shared/utils/composeFunctions.js";
import {createMemoRegex} from "@calculatorService/utils/createMemoRegex.js";
import {getOptionalParenthesesRegex} from "../createRegex/getOptionalParenthesesRegex.js";
import {getPrefixFunctionNamesRegex} from "../createRegex/getPrefixFunctionNamesRegex.js";
import {Regex} from "@calculatorService/constants/regex.js";
import {parenthesize} from "../parenthesize.js";
import {getFirstMatch} from "@shared/utils/regexUtils/getFirstMatch.js";
import {removeSpaces} from "../removeSpaces.js";
import {toLowerCase} from "../toLowerCase.js";

export function transformExpression(expression, operationCategories) {
    const formattedExpression = compose(removeSpaces, toLowerCase)(expression);
    const transformExpression = compose(functionOptionalParenthesesAdapter);

    return transformExpression(formattedExpression, operationCategories);
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