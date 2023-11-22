import {Regex} from "../../constants/regex.js";
import {Symbols} from "UserConfig/constants/constants.js";
import {createMemoRegex} from "../createMemoRegex.js";
import {extractFunctionsObject} from "../extractors/extractFunctionsObject.js";
import {getFunctionOperationSignsRegexSource} from "./operations/getFunctionOperationSignsRegexSource.js";
import {getFunctionRegexSource} from "./operations/getFunctionRegexSource.js";

export const INNERMOST_NESTING_GROUP = "innermostNesting";

// innermost nesting inside parentheses, not including functions
export function getInnermostNestingRegex(operationQueue) {
    const operationsList = extractFunctionsObject(operationQueue);
    const { prefixFunctionNames, postfixFunctionNames } = getFunctionOperationSignsRegexSource(operationsList);
    const functionRegex = getFunctionRegexSource(operationsList);

    const noParentheses = `[^()]`;
    const innermostExpression = `(${noParentheses}|${functionRegex})+`;
    const innermostExpressionCapturingGroup = `(?<innermostNesting>${innermostExpression})`;
    const parenthesedInnermostExpression = `\\${Symbols.LP}${innermostExpressionCapturingGroup}\\${Symbols.RP}`;
    const noFunctionNamesBefore = `(?<!${prefixFunctionNames})`;
    const noFunctionNamesAfter = `(?!${postfixFunctionNames})`;

    return `${noFunctionNamesBefore}${parenthesedInnermostExpression}${noFunctionNamesAfter}`;
}