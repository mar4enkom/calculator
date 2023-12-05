import {createMemoRegex} from "CalculatorService/utils/createMemoRegex.js";
import {getFunctionRegexSource} from "CalculatorService/utils/createRegex/operations/getFunctionRegexSource.js";
import {Symbols} from "UserConfig/constants/constants.js";
import {getOperationSignsRegexSource} from "CalculatorService/utils/createRegex/operations/getOperationSignsRegexSource.js";
import {OperationProps} from "../constants/constants.js";

export class FunctionDetails {
    constructor(operationsList) {
        this[OperationProps.BODY_REGEX] =  this.getExtractOperationBodyRegex;
        this[OperationProps.EXTRACT_OPERANDS] = this.extractFunctionOperands;
        this[OperationProps.OPERATION_SIGN_REGEX] = this.getExtractOperationSignRegex;
    }
    getExtractOperationBodyRegex(operationsList) {
        return createMemoRegex(getFunctionRegexSource(operationsList))
    }

    extractFunctionOperands(sign, expression) {
        const argsStr = expression.slice(expression.indexOf(Symbols.LP)+1, expression.indexOf(Symbols.RP));
        return argsStr.split(Symbols.COMMA);
    }

    getExtractOperationSignRegex(operationsList) {
        const operationSignsRegexSource = getOperationSignsRegexSource(operationsList);
        return createMemoRegex(operationSignsRegexSource);
    }
}