import {createMemoRegex} from "../../../../createMemoRegex.js";
import {getFunctionRegexSource} from "../../../../createRegex/operations/getFunctionRegexSource.js";
import {Symbols} from "@userConfig/constants/constants.js";
import {getOperationSignsRegexSource} from "../../../../createRegex/operations/getOperationSignsRegexSource.js";
import {OperationProps} from "../constants/constants.js";
import {Regex} from "../../../../../constants/regex.js";

export class SignDetails {
    constructor(operationsList) {
        this[OperationProps.BODY_REGEX] =  this.getExtractOperationBodyRegex;
        this[OperationProps.EXTRACT_OPERANDS] = this.extractFunctionOperands;
        this[OperationProps.OPERATION_SIGN_REGEX] = this.getExtractOperationSignRegex;
    }
    getExtractOperationBodyRegex(operationsList) {
        const operationSignRegexSource = getOperationSignsRegexSource(operationsList);
        return createMemoRegex(`${Regex.FLOAT_NUMBER.source}${operationSignRegexSource}`)
    }

    extractFunctionOperands(sign, expression) {
        return [expression.slice(0, expression.indexOf(sign))];
    }

    getExtractOperationSignRegex(operationsList) {
        const operationSignsRegexSource = getOperationSignsRegexSource(operationsList);
        return createMemoRegex(operationSignsRegexSource);
    }
}