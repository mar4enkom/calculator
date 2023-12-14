import {ProcessedConfig} from "calculatorService/types/types";
import {extractFunctionCategoryProps} from "calculatorService/utils/extractors/extractFunctionCategoryProps";
import {
    getFunctionOperationSignsRegexSource
} from "calculatorService/utils/createRegex/operations/getFunctionOperationSignsRegexSource";
import {getFunctionRegexSource} from "calculatorService/utils/createRegex/operations/getFunctionRegexSource";
import {Symbols} from "@calculator/common";

export const InnermostExpressionGroups = {
    INNERMOST_EXPRESSION: "innermostExpression"
}

// innermost expression inside parentheses, innermost expression includes functions
export function getInnermostExpressionRegexSource(operations: ProcessedConfig): string {
    const operationList = extractFunctionCategoryProps(operations);
    const { prefixFunctionNames, postfixFunctionNames } = getFunctionOperationSignsRegexSource(operationList);
    const functionRegex = getFunctionRegexSource(operationList);

    const noParentheses = `[^()]`;
    const innermostExpression = `(${noParentheses}|${functionRegex})+`;
    const innermostExpressionCapturingGroup = `(?<${InnermostExpressionGroups.INNERMOST_EXPRESSION}>${innermostExpression})`;
    const parenthesedInnermostExpression = `\\${Symbols.LP}${innermostExpressionCapturingGroup}\\${Symbols.RP}`;
    const noFunctionNamesBefore = `(?<!${prefixFunctionNames})`;
    const noFunctionNamesAfter = `(?!${postfixFunctionNames})`;

    return `${noFunctionNamesBefore}${parenthesedInnermostExpression}${noFunctionNamesAfter}`;
}