import {ProcessedConfig} from "@/calculate/domain/CalculatorService/types/types";
import {
    extractFunctionCategoryProps
} from "@/calculate/domain/CalculatorService/utils/extractors/extractFunctionCategoryProps";
import {
    getFunctionOperationSignsRegexSource
} from "@/calculate/domain/CalculatorService/utils/createRegex/operations/getFunctionOperationSignsRegexSource";
import {RegexMap} from "@/calculate/domain/CalculatorService/constants/regexMap";


export function getOptionalParenthesesRegex(operationCategories: ProcessedConfig): string {
    const operationsList = extractFunctionCategoryProps(operationCategories);
    const { prefixFunctionNames, postfixFunctionNames} =  getFunctionOperationSignsRegexSource(operationsList);
    return `(${prefixFunctionNames}${RegexMap.FLOAT_NUMBER.source})|(${RegexMap.FLOAT_NUMBER.source}${postfixFunctionNames})`;
}