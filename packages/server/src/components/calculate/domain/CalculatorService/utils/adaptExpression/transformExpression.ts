import {compose, Symbols} from "@calculator/common";
import {getOptionalParenthesesRegex} from "../createRegex/getOptionalParenthesesRegex";
import {getPrefixFunctionNamesRegexSource} from "../createRegex/getPrefixFunctionNamesRegexSource";
import {ProcessedConfig} from "../../types/types";
import {createMemoRegex} from "../createMemoRegex";
import {removeSpaces} from "../removeSpaces";
import {toLowerCase} from "../toLowerCase";
import {getFirstMatch} from "@calculator/common";
import {RegexMap} from "../../constants/regexMap";
import {parenthesize} from "../parenthesize";

export function transformExpression(expression: string, operationCategories: ProcessedConfig, symbols: Symbols): string {
    const formattedExpression = compose<(a: string) => string>(removeSpaces, toLowerCase)(expression);

    return functionOptionalParenthesesAdapter(formattedExpression, operationCategories, symbols);
}

function functionOptionalParenthesesAdapter(expression: string, operationCategories: ProcessedConfig, symbols: Symbols): string {
    const optionalParenthesesRegex = createMemoRegex(getOptionalParenthesesRegex(operationCategories));
    const prefixFunctionNamesRegex = createMemoRegex(getPrefixFunctionNamesRegexSource(operationCategories));

    let currentExpression = expression;

    while(true) {
        const matchedExpr = getFirstMatch(optionalParenthesesRegex, currentExpression);
        if(matchedExpr == null) return currentExpression;

        const operand = getFirstMatch(RegexMap.FLOAT_NUMBER, matchedExpr)!;
        const operationSign = matchedExpr.replace(operand, "");

        let updatedExpr;
        if(getFirstMatch(prefixFunctionNamesRegex, matchedExpr) != null) {
            updatedExpr = operationSign.concat(parenthesize(operand, symbols));
        } else {
            updatedExpr = parenthesize(operand, symbols).concat(operationSign);
        }
        currentExpression = currentExpression.replace(matchedExpr, updatedExpr);
    }

    return currentExpression;
}