import {Regex} from "../constants/regex.js";
import {
    getFunctionOperationSignsRegexSource,
    getFunctionRegexSource
} from "../modules/calculator/model/utils/getOperationSignsRegexSource.js";
import {Symbols} from "../constants/constants.js";
import {createRegex} from "../modules/calculator/model/utils/createRegex.js";

// largest nesting inside parentheses, not including functions
export function getLargestNestingRegex(functionOperationsList) {
    const { prefixFunctionNames, postfixFunctionNames } = getFunctionOperationSignsRegexSource(functionOperationsList);
    const functionRegexSource = getFunctionRegexSource(functionOperationsList);

    const innermostNesting = `([^()]|${functionRegexSource})*`;
    const noFunctionNamesBefore = `(?<!${prefixFunctionNames})`;
    const noFunctionNamesAfter = `(?!${postfixFunctionNames})`;

    return createRegex(
        `${noFunctionNamesBefore}\\${Symbols.LP}${innermostNesting}\\${Symbols.RP}${noFunctionNamesAfter}`
    );
}