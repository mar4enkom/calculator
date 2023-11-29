import {extractFunctionCategoryProps} from "../extractors/extractFunctionCategoryProps.js";
import {memoize} from "../memoize.js";
import {getFunctionOperationSignsRegexSource} from "./operations/getFunctionOperationSignsRegexSource.js";

export function getPrefixFunctionNamesRegex(operations) {
    const operationsList = extractFunctionCategoryProps(operations);
    const { prefixFunctionNames} =  getFunctionOperationSignsRegexSource(operationsList);

    return prefixFunctionNames;
}