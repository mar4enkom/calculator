import {extractFunctionCategoryProps} from "../extractors/extractFunctionCategoryProps";
import {ProcessedConfig} from "../../types/types";
import {
    getFunctionOperationSignsRegexSource
} from "./operations/getFunctionOperationSignsRegexSource";
import {Regex} from "../../constants/regex";

export function getOptionalParenthesesRegex(operationCategories: ProcessedConfig): string {
    const operationsList = extractFunctionCategoryProps(operationCategories);
    const { prefixFunctionNames, postfixFunctionNames} =  getFunctionOperationSignsRegexSource(operationsList);
    return `(${prefixFunctionNames}${Regex.FLOAT_NUMBER.source})|(${Regex.FLOAT_NUMBER.source}${postfixFunctionNames})`;
}