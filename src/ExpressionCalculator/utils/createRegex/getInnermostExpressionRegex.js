import {Regex} from "CalculatorService/constants/regex.js";
import {Symbols} from "UserConfig/constants/constants.js";
import {createMemoRegex} from "CalculatorService/utils/createMemoRegex.js";
import {extractFunctionCategoryProps} from "CalculatorService/utils/extractors/extractFunctionCategoryProps.js";
import {getFunctionOperationSignsRegexSource} from "CalculatorService/utils/createRegex/operations/getFunctionOperationSignsRegexSource.js";
import {getFunctionRegexSource} from "CalculatorService/utils/createRegex/operations/getFunctionRegexSource.js";

export const InnermostExpressionGroups = {
    INNERMOST_EXPRESSION: "innermostExpression"
}

// innermost expression inside parentheses, innermost expression includes functions
export function getInnermostExpressionRegex(operations) {
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