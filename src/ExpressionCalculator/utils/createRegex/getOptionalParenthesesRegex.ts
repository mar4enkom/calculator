import {extractFunctionCategoryProps} from "calculatorService/utils/extractors/extractFunctionCategoryProps";
import {ProcessedConfig} from "calculatorService/types/types";
import {
    getFunctionOperationSignsRegexSource
} from "calculatorService/utils/createRegex/operations/getFunctionOperationSignsRegexSource";
import {Regex} from "calculatorService/constants/regex";

export function getOptionalParenthesesRegex(operationCategories: ProcessedConfig): string {
    const operationsList = extractFunctionCategoryProps(operationCategories);
    const { prefixFunctionNames, postfixFunctionNames} =  getFunctionOperationSignsRegexSource(operationsList);
    return `(${prefixFunctionNames}${Regex.FLOAT_NUMBER.source})|(${Regex.FLOAT_NUMBER.source}${postfixFunctionNames})`;
}