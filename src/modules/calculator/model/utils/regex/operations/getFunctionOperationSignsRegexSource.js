import {getOperationSignsGroupRegex} from "./getOperationSignsGroupRegex.js";

export function getFunctionOperationSignsRegexSource(operationsList) {
    const postfixFunctionNames = operationsList
        .filter(op => op.postfixForm === true)
        .map(op => op.sign);
    const prefixFunctionNames = operationsList
        .filter(op => !op.postfixForm)
        .map(op => op.sign);

    return {
        prefixFunctionNames: getOperationSignsGroupRegex(prefixFunctionNames),
        postfixFunctionNames: getOperationSignsGroupRegex(postfixFunctionNames),
    }
}