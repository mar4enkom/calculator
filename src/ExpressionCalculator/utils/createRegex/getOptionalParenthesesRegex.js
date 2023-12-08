import {extractFunctionCategoryProps} from "CalculatorService/utils/extractors/extractFunctionCategoryProps.js";
import {Regex} from "CalculatorService/constants/regex.js";
import {memoize} from "CalculatorService/utils/memoize.js";
import {getFunctionOperationSignsRegexSource} from "CalculatorService/utils/createRegex/operations/getFunctionOperationSignsRegexSource.js";

export function getOptionalParenthesesRegex(operations) {
    const operationsList = extractFunctionCategoryProps(operations);
    const { prefixFunctionNames, postfixFunctionNames} =  getFunctionOperationSignsRegexSource(operationsList);
    return `(${prefixFunctionNames}${Regex.FLOAT_NUMBER.source})|(${Regex.FLOAT_NUMBER.source}${postfixFunctionNames})`;
}