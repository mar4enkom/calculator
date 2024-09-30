
import {Symbols} from "@calculator/common";
import {ProcessedConfig} from "@/calculate/domain/CalculatorService/types/types";
import {
    extractFunctionCategoryProps
} from "@/calculate/domain/CalculatorService/utils/extractors/extractFunctionCategoryProps";
import {
    getFunctionOperationSignsRegexSource
} from "@/calculate/domain/CalculatorService/utils/createRegex/operations/getFunctionOperationSignsRegexSource";
import {
    getFunctionRegexSource
} from "@/calculate/domain/CalculatorService/utils/createRegex/operations/getFunctionRegexSource";

export const InnermostExpressionGroups = {
    INNERMOST_EXPRESSION: "innermostExpression"
}

// innermost expression inside parentheses, innermost expression includes functions
export function getInnermostExpressionRegexSource(operations: ProcessedConfig, symbols: Symbols): string {
    const operationList = extractFunctionCategoryProps(operations);
    const { prefixFunctionNames, postfixFunctionNames } = getFunctionOperationSignsRegexSource(operationList);
    const functionRegex = getFunctionRegexSource(operationList);

    const noParentheses = `[^()]`;
    const innermostExpression = `(${noParentheses}|${functionRegex})+`;
    const innermostExpressionCapturingGroup = `(?<${InnermostExpressionGroups.INNERMOST_EXPRESSION}>${innermostExpression})`;
    const parenthesedInnermostExpression = `\\${symbols.LP}${innermostExpressionCapturingGroup}\\${symbols.RP}`;
    const noFunctionNamesBefore = `(?<!${prefixFunctionNames})`;
    const noFunctionNamesAfter = `(?!${postfixFunctionNames})`;

    return `${noFunctionNamesBefore}${parenthesedInnermostExpression}${noFunctionNamesAfter}`;
}