import {extractFunctionsObject} from "../extractors/extractFunctionsObject.js";
import {Regex} from "../../constants/regex.js";
import {memoize} from "../memoize.js";
import {getFunctionOperationSignsRegexSource} from "./operations/getFunctionOperationSignsRegexSource.js";

export function getOptionalParenthesesRegex(operationQueue) {
    const operationsList = extractFunctionsObject(operationQueue);
    const { prefixFunctionNames, postfixFunctionNames} =  getFunctionOperationSignsRegexSource(operationsList);
    return `(${prefixFunctionNames}${Regex.FLOAT_NUMBER.source})|(${Regex.FLOAT_NUMBER.source}${postfixFunctionNames})`;
}