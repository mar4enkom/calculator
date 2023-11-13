import {extractFunctionsObject} from "../extractors/extractFunctionsObject.js";
import {memoize} from "../memoize.js";
import {getFunctionOperationSignsRegexSource} from "./operations/getFunctionOperationSignsRegexSource.js";

export function getPrefixFunctionNamesRegex(operationQueue) {
    const operationsList = extractFunctionsObject(operationQueue);
    const { prefixFunctionNames} =  getFunctionOperationSignsRegexSource(operationsList);

    return prefixFunctionNames;
}