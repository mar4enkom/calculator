import {OperationProps} from "./constants/constants.js";
import {Symbols} from "UserConfig/constants/constants.js";
import {getOperationSignsRegexSource} from "../../../../utils/createRegex/operations/getOperationSignsRegexSource.js";
import {createMemoRegex} from "../../../../utils/createMemoRegex.js";
import {Regex} from "../../../../constants/regex.js";
import {getFunctionRegexSource} from "../../../../utils/createRegex/operations/getFunctionRegexSource.js";

export const operationsProps = {
    [OperationProps.BODY_REGEX]: getExtractOperationBodyRegex,
    [OperationProps.EXTRACT_OPERANDS]: extractFunctionOperands,
    [OperationProps.OPERATION_SIGN_REGEX]: getExtractOperationSignRegex,
}

function getExtractOperationBodyRegex(operationsList) {
    const operationSignsRegexSource = getOperationSignsRegexSource(operationsList);
    return createMemoRegex(`${Regex.FLOAT_NUMBER.source}${operationSignsRegexSource}${Regex.FLOAT_NUMBER.source}`)
}

function extractFunctionOperands(sign, expression) {
    return expression.split(sign);
}

function getExtractOperationSignRegex(operationsList) {
    const operationSignsRegexSource = getOperationSignsRegexSource(operationsList);
    return createMemoRegex(`(?<=\\d)${operationSignsRegexSource}`);
}