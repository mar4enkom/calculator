import {OperationProps} from "./constants/constants.js";
import {createMemoRegex} from "../createMemoRegex.js";
import {getFunctionRegexSource, getOperationSignsRegexSource} from "../getOperationSignsRegexSource.js";
import {Symbols} from "../../../../../../userConfig/operations/constants/constants.js";

export const constantsProps = {
    [OperationProps.BODY_REGEX]: getExtractOperationBodyRegex,
    [OperationProps.EXTRACT_OPERANDS]: extractFunctionOperands,
    [OperationProps.OPERATION_SIGN_REGEX]: getExtractOperationSignRegex,
}

function getExtractOperationBodyRegex(operationsList) {
    const operationSignRegexSource = getOperationSignsRegexSource(operationsList);
    return createMemoRegex(`${operationSignRegexSource}`)
}

function extractFunctionOperands(sign, expression) {
    return [];
}

function getExtractOperationSignRegex(operationsList) {
    const operationSignsRegexSource = getOperationSignsRegexSource(operationsList);
    return createMemoRegex(operationSignsRegexSource);
}