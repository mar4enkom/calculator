import {ProcessedConfig} from "calculatorService/types/types";
import {extractFunctionCategoryProps} from "calculatorService/utils/extractors/extractFunctionCategoryProps";
import {
    getFunctionOperationSignsRegexSource
} from "calculatorService/utils/createRegex/operations/getFunctionOperationSignsRegexSource";

export function getPrefixFunctionNamesRegexSource(operations: ProcessedConfig): string {
    const operationsList = extractFunctionCategoryProps(operations);
    const { prefixFunctionNames} =  getFunctionOperationSignsRegexSource(operationsList);

    return prefixFunctionNames;
}