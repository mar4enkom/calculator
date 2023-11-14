import {Regex} from "../../constants/regex.js";
import {Symbols} from "UserConfig/constants/constants.js";
import {createMemoRegex} from "../createMemoRegex.js";
import {extractFunctionsObject} from "../extractors/extractFunctionsObject.js";
import {getFunctionOperationSignsRegexSource} from "./operations/getFunctionOperationSignsRegexSource.js";
import {getFunctionRegexSource} from "./operations/getFunctionRegexSource.js";

// innermost nesting inside parentheses, not including functions
export function getInnermostNestingRegex(operationQueue) {
    const operationsList = extractFunctionsObject(operationQueue);
    const { prefixFunctionNames, postfixFunctionNames } = getFunctionOperationSignsRegexSource(operationsList);
    const functionRegexSource = getFunctionRegexSource(operationsList);

    const innermostNesting = `([^()]|${functionRegexSource})*`;
    const innermostNestingCapturingGroup = `(?<innermostNesting>${innermostNesting})`;
    const noFunctionNamesBefore = `(?<!${prefixFunctionNames})`;
    const noFunctionNamesAfter = `(?!${postfixFunctionNames})`;

    return `${noFunctionNamesBefore}\\${Symbols.LP}${innermostNestingCapturingGroup}\\${Symbols.RP}${noFunctionNamesAfter}`;
}