import {OperationProps} from "./constants/constants.js";
import {createMemoRegex} from "../../../../utils/createMemoRegex.js";
import {getOperationSignsRegexSource} from "../../../../utils/createRegex/operations/getOperationSignsRegexSource.js";
import {Symbols} from "UserConfig/constants/constants.js";
import {Regex} from "../../../../constants/regex.js";
import {getFunctionRegexSource} from "../../../../utils/createRegex/operations/getFunctionRegexSource.js";

export const signsProps = {
    [OperationProps.BODY_REGEX]: getExtractOperationBodyRegex,
    [OperationProps.EXTRACT_OPERANDS]: extractFunctionOperands,
    [OperationProps.OPERATION_SIGN_REGEX]: getExtractOperationSignRegex,
}

function getExtractOperationBodyRegex(operationsList) {
    const operationSignRegexSource = getOperationSignsRegexSource(operationsList);
    return createMemoRegex(`${Regex.FLOAT_NUMBER.source}${operationSignRegexSource}`)
}

function extractFunctionOperands(sign, expression) {
    return [expression.slice(0, expression.indexOf(sign))];
}

function getExtractOperationSignRegex(operationsList) {
    const operationSignsRegexSource = getOperationSignsRegexSource(operationsList);
    return createMemoRegex(operationSignsRegexSource);
}