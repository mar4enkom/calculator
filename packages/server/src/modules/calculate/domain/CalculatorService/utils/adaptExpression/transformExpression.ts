import {ProcessedConfig} from "@/calculate/domain/CalculatorService/types/types";
import {compose, getFirstMatch, Symbols} from "@calculator/common";
import {removeSpaces} from "@/calculate/domain/CalculatorService/utils/removeSpaces";
import {toLowerCase} from "@/calculate/domain/CalculatorService/utils/toLowerCase";
import {createMemoRegex} from "@/calculate/domain/CalculatorService/utils/createMemoRegex";
import {
    getOptionalParenthesesRegex
} from "@/calculate/domain/CalculatorService/utils/createRegex/getOptionalParenthesesRegex";
import {
    getPrefixFunctionNamesRegexSource
} from "@/calculate/domain/CalculatorService/utils/createRegex/getPrefixFunctionNamesRegexSource";
import {RegexMap} from "@/calculate/domain/CalculatorService/constants/regexMap";
import {parenthesize} from "@/calculate/domain/CalculatorService/utils/parenthesize";


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