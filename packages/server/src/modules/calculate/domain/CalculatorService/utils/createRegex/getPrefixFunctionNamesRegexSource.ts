import {ProcessedConfig} from "@/calculate/domain/CalculatorService/types/types";
import {
    extractFunctionCategoryProps
} from "@/calculate/domain/CalculatorService/utils/extractors/extractFunctionCategoryProps";
import {
    getFunctionOperationSignsRegexSource
} from "@/calculate/domain/CalculatorService/utils/createRegex/operations/getFunctionOperationSignsRegexSource";

export function getPrefixFunctionNamesRegexSource(operations: ProcessedConfig): string {
    const operationsList = extractFunctionCategoryProps(operations);
    const { prefixFunctionNames} =  getFunctionOperationSignsRegexSource(operationsList);

    return prefixFunctionNames;
}