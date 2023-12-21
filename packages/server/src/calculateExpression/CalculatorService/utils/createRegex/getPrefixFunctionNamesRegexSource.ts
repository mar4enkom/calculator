import {ProcessedConfig} from "../../types/types";
import {extractFunctionCategoryProps} from "../extractors/extractFunctionCategoryProps";
import {
    getFunctionOperationSignsRegexSource
} from "./operations/getFunctionOperationSignsRegexSource";

export function getPrefixFunctionNamesRegexSource(operations: ProcessedConfig): string {
    const operationsList = extractFunctionCategoryProps(operations);
    const { prefixFunctionNames} =  getFunctionOperationSignsRegexSource(operationsList);

    return prefixFunctionNames;
}