import {extractFunctionsObject} from "../../../../../utils/extractFunctionsObject.js";
import {getFunctionOperationSignsRegexSource} from "../getOperationSignsRegexSource.js";
import {memoize} from "../memoize.js";

export function getPrefixFunctionNamesRegex(operationQueue) {
    const operationsList = extractFunctionsObject(operationQueue);
    const { prefixFunctionNames} =  getFunctionOperationSignsRegexSource(operationsList);

    return prefixFunctionNames;
}