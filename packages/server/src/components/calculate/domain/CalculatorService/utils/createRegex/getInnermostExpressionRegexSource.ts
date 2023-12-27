import {ProcessedConfig} from "../../types/types";
import {extractFunctionCategoryProps} from "../extractors/extractFunctionCategoryProps";
import {
    getFunctionOperationSignsRegexSource
} from "./operations/getFunctionOperationSignsRegexSource";
import {getFunctionRegexSource} from "./operations/getFunctionRegexSource";
import {Symbols} from "@calculator/common";

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