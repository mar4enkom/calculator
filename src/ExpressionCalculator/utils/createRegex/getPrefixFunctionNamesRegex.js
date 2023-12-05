import {extractFunctionCategoryProps} from "CalculatorService/utils/extractors/extractFunctionCategoryProps.js";
import {memoize} from "CalculatorService/utils/memoize.js";
import {getFunctionOperationSignsRegexSource} from "CalculatorService/utils/createRegex/operations/getFunctionOperationSignsRegexSource.js";

export function getPrefixFunctionNamesRegex(operations) {
    const operationsList = extractFunctionCategoryProps(operations);
    const { prefixFunctionNames} =  getFunctionOperationSignsRegexSource(operationsList);

    return prefixFunctionNames;
}