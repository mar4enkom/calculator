import {OperationProps} from "./constants/constants.js";
import {Symbols} from "../../../../../../../../userConfig/operations/constants/constants.js";
import {getOperationSignsRegexSource} from "../../../../utils/regex/operations/getOperationSignsRegexSource.js";
import {createMemoRegex} from "../../../../utils/createMemoRegex.js";
import {getFunctionRegexSource} from "../../../../utils/regex/operations/getFunctionRegexSource.js";

export const functionsProps = {
    [OperationProps.BODY_REGEX]: getExtractOperationBodyRegex,
    [OperationProps.EXTRACT_OPERANDS]: extractFunctionOperands,
    [OperationProps.OPERATION_SIGN_REGEX]: getExtractOperationSignRegex,
}

function getExtractOperationBodyRegex(operationsList) {
    return createMemoRegex(getFunctionRegexSource(operationsList))
}

function extractFunctionOperands(sign, expression) {
    const argsStr = expression.slice(expression.indexOf(Symbols.LP)+1, expression.indexOf(Symbols.RP));
    return argsStr.split(Symbols.COMMA);
}

function getExtractOperationSignRegex(operationsList) {
    const operationSignsRegexSource = getOperationSignsRegexSource(operationsList);
    return createMemoRegex(operationSignsRegexSource);
}