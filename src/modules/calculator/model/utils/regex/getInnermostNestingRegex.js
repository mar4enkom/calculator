import {Regex} from "../../constants/regex.js";
import {
    getFunctionOperationSignsRegexSource,
    getFunctionRegexSource
} from "../getOperationSignsRegexSource.js";
import {Symbols} from "../../../../../../userConfig/operations/constants/constants.js";
import {createMemoRegex} from "../createMemoRegex.js";
import {extractFunctionsObject} from "../extractFunctionsObject.js";

// innermost nesting inside parentheses, not including functions
export function getInnermostNestingRegex(operationQueue) {
    const operationsList = extractFunctionsObject(operationQueue);
    const { prefixFunctionNames, postfixFunctionNames } = getFunctionOperationSignsRegexSource(operationsList);
    const functionRegexSource = getFunctionRegexSource(operationsList);

    const innermostNesting = `([^()]|${functionRegexSource})*`;
    const innermostNestingCapturingGroup = `(?<innermostNesting>${innermostNesting})`;
    const noFunctionNamesBefore = `(?<!${prefixFunctionNames})`;
    const noFunctionNamesAfter = `(?!${postfixFunctionNames})`;

    return createMemoRegex(
        `${noFunctionNamesBefore}\\${Symbols.LP}${innermostNestingCapturingGroup}\\${Symbols.RP}${noFunctionNamesAfter}`
    );
}