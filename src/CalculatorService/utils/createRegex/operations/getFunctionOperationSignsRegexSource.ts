import {FunctionOperationList} from "userConfig/operations/types";
import {
    getOperationSignsGroupRegexSource
} from "calculatorService/utils/createRegex/operations/getOperationSignsGroupRegexSource";

export function getFunctionOperationSignsRegexSource(operationsList: FunctionOperationList) {
    const postfixFunctionNames = operationsList
        .filter(op => op.postfixForm === true)
        .map(op => op.sign);
    const prefixFunctionNames = operationsList
        .filter(op => !op.postfixForm)
        .map(op => op.sign);

    return {
        prefixFunctionNames: getOperationSignsGroupRegexSource(prefixFunctionNames),
        postfixFunctionNames: getOperationSignsGroupRegexSource(postfixFunctionNames),
    }
}