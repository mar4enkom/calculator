import {createMemoRegex} from "CalculatorService/utils/createMemoRegex.js";
import {getFunctionRegexSource} from "CalculatorService/utils/createRegex/operations/getFunctionRegexSource.js";
import {Symbols} from "UserConfig/constants/constants.js";
import {getOperationSignsRegexSource} from "CalculatorService/utils/createRegex/operations/getOperationSignsRegexSource.js";
import {OperationProps} from "CalculatorService/utils/processConfig/addOperationDecorators/getOperationDetailsExtractor/constants/constants.js";
import {Regex} from "CalculatorService/constants/regex.js";

export class OperatorDetails {
    constructor(operationsList) {
        this[OperationProps.BODY_REGEX] =  this.getExtractOperationBodyRegex;
        this[OperationProps.EXTRACT_OPERANDS] = this.extractFunctionOperands;
        this[OperationProps.OPERATION_SIGN_REGEX] = this.getExtractOperationSignRegex;
    }
    getExtractOperationBodyRegex(operationsList) {
        const operationSignsRegexSource = getOperationSignsRegexSource(operationsList);
        return createMemoRegex(`${Regex.FLOAT_NUMBER.source}${operationSignsRegexSource}${Regex.FLOAT_NUMBER.source}`)
    }

    extractFunctionOperands(sign, expression) {
        return expression.split(sign);
    }

    getExtractOperationSignRegex(operationsList) {
        const operationSignsRegexSource = getOperationSignsRegexSource(operationsList);
        return createMemoRegex(`(?<=${Regex.FLOAT_NUMBER.source})${operationSignsRegexSource}`);
    }
}