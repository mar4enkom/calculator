import {extractFunctionCategoryProps} from "../extractors/extractFunctionCategoryProps";
import {ProcessedConfig} from "../../types/types";
import {
    getFunctionOperationSignsRegexSource
} from "./operations/getFunctionOperationSignsRegexSource";
import {RegexMap} from "../../constants/regexMap";

export function getOptionalParenthesesRegex(operationCategories: ProcessedConfig): string {
    const operationsList = extractFunctionCategoryProps(operationCategories);
    const { prefixFunctionNames, postfixFunctionNames} =  getFunctionOperationSignsRegexSource(operationsList);
    return `(${prefixFunctionNames}${RegexMap.FLOAT_NUMBER.source})|(${RegexMap.FLOAT_NUMBER.source}${postfixFunctionNames})`;
}