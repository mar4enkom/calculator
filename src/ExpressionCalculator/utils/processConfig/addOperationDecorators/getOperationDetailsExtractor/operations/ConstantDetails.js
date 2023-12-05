import {createMemoRegex} from "CalculatorService/utils/createMemoRegex.js";
import {getFunctionRegexSource} from "CalculatorService/utils/createRegex/operations/getFunctionRegexSource.js";
import {Symbols} from "UserConfig/constants/constants.js";
import {getOperationSignsRegexSource} from "CalculatorService/utils/createRegex/operations/getOperationSignsRegexSource.js";
import {Regex} from "CalculatorService/constants/regex.js";
import {OperationProps} from "../constants/constants.js";

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