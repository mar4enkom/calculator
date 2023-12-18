import {compose} from "shared/utils/composeFunctions";
import {getOptionalParenthesesRegex} from "calculatorService/utils/createRegex/getOptionalParenthesesRegex";
import {getPrefixFunctionNamesRegexSource} from "calculatorService/utils/createRegex/getPrefixFunctionNamesRegexSource";
import {ProcessedConfig} from "calculatorService/types/types";
import {createMemoRegex} from "calculatorService/utils/createMemoRegex";
import {removeSpaces} from "calculatorService/utils/removeSpaces";
import {toLowerCase} from "calculatorService/utils/toLowerCase";
import {getFirstMatch} from "shared/utils/regexUtils/getFirstMatch";
import {Regex} from "calculatorService/constants/regex";
import {parenthesize} from "calculatorService/utils/parenthesize";

export function transformExpression(expression: string, operationCategories: ProcessedConfig): string {
    const formattedExpression = compose<(a: string) => string>(removeSpaces, toLowerCase)(expression);

    return functionOptionalParenthesesAdapter(formattedExpression, operationCategories);
}

function functionOptionalParenthesesAdapter(expression: string, operationCategories: ProcessedConfig): string {
    const optionalParenthesesRegex = createMemoRegex(getOptionalParenthesesRegex(operationCategories));
    const prefixFunctionNamesRegex = createMemoRegex(getPrefixFunctionNamesRegexSource(operationCategories));

    let currentExpression = expression;

    while(true) {
        const matchedExpr = getFirstMatch(optionalParenthesesRegex, currentExpression);
        if(matchedExpr == null) return currentExpression;

        const operand = getFirstMatch(Regex.FLOAT_NUMBER, matchedExpr)!;
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