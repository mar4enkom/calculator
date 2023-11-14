import {OperationProps} from "./constants/constants.js";
import {createMemoRegex} from "../../../../utils/createMemoRegex.js";
import {getOperationSignsRegexSource} from "../../../../utils/createRegex/operations/getOperationSignsRegexSource.js";
import {Symbols} from "UserConfig/constants/constants.js";
import {getFunctionRegexSource} from "../../../../utils/createRegex/operations/getFunctionRegexSource.js";

export const constantsProps = {
    [OperationProps.BODY_REGEX]: getExtractOperationBodyRegex,
    [OperationProps.EXTRACT_OPERANDS]: () => [],
    [OperationProps.OPERATION_SIGN_REGEX]: getExtractOperationSignRegex,
}

function getExtractOperationBodyRegex(operationsList) {
    const operationSignRegexSource = getOperationSignsRegexSource(operationsList);
    return createMemoRegex(`${operationSignRegexSource}`)
}

function getExtractOperationSignRegex(operationsList) {
    const operationSignsRegexSource = getOperationSignsRegexSource(operationsList);
    return createMemoRegex(operationSignsRegexSource);
}