import {createMemoRegex} from "../../../../createMemoRegex.js";
import {getFunctionRegexSource} from "../../../../createRegex/operations/getFunctionRegexSource.js";
import {Symbols} from "UserConfig/constants/constants.js";
import {getOperationSignsRegexSource} from "../../../../createRegex/operations/getOperationSignsRegexSource.js";
import {OperationProps} from "../constants/constants.js";
import {Regex} from "../../../../../constants/regex.js";

export class ConstantDetails {
    constructor(operationsList) {
        this[OperationProps.BODY_REGEX] =  this.getExtractOperationBodyRegex;
        this[OperationProps.EXTRACT_OPERANDS] = () => [];
        this[OperationProps.OPERATION_SIGN_REGEX] = this.getExtractOperationSignRegex;
    }
    getExtractOperationBodyRegex(operationsList) {
        const operationSignRegexSource = getOperationSignsRegexSource(operationsList);
        return createMemoRegex(`${operationSignRegexSource}`)
    }

    getExtractOperationSignRegex(operationsList) {
        const operationSignsRegexSource = getOperationSignsRegexSource(operationsList);
        return createMemoRegex(operationSignsRegexSource);
    }
}