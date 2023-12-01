import {extractFunctionCategoryProps} from "../extractors/extractFunctionCategoryProps.js";
import {Regex} from "../../constants/regex.js";
import {memoize} from "../memoize.js";
import {getFunctionOperationSignsRegexSource} from "./operations/getFunctionOperationSignsRegexSource.js";

export function getOptionalParenthesesRegex(operations) {
    const operationsList = extractFunctionCategoryProps(operations);
    const { prefixFunctionNames, postfixFunctionNames} =  getFunctionOperationSignsRegexSource(operationsList);
    return `(${prefixFunctionNames}${Regex.FLOAT_NUMBER.source})|(${Regex.FLOAT_NUMBER.source}${postfixFunctionNames})`;
}