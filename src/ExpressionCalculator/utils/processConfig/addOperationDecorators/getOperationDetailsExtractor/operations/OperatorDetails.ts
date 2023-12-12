import {OperationList} from "userConfig/operations/types";
import {
    IOperationDetails
} from "calculatorService/utils/processConfig/addOperationDecorators/getOperationDetailsExtractor/operations/types";
import {
    getOperationSignsRegexSource
} from "calculatorService/utils/createRegex/operations/getOperationSignsRegexSource";
import {createMemoRegex} from "calculatorService/utils/createMemoRegex";
import {Regex} from "calculatorService/constants/regex";

export class OperatorDetails implements IOperationDetails {
    getBodyRegex(operationsList: OperationList) {
        const operationSignsRegexSource = getOperationSignsRegexSource(operationsList);
        return createMemoRegex(`${Regex.FLOAT_NUMBER.source}${operationSignsRegexSource}${Regex.FLOAT_NUMBER.source}`)
    }
    getOperationSignRegex(operationsList: OperationList) {
        const operationSignsRegexSource = getOperationSignsRegexSource(operationsList);
        return createMemoRegex(`(?<=${Regex.FLOAT_NUMBER.source})${operationSignsRegexSource}`);
    }
    extractOperands(sign: string, expression: string) {
        return expression.split(sign);
    }
}