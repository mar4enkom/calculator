import {getOperationSignsRegexSource} from "calculatorService/utils/createRegex/operations/getOperationSignsRegexSource";
import {OperationList} from "userConfig/operations/types";
import {createMemoRegex} from "calculatorService/utils/createMemoRegex";
import {
    IOperationDetails
} from "calculatorService/utils/processConfig/addOperationDecorators/getOperationDetailsExtractor/operations/types";

export class ConstantDetails implements IOperationDetails{
    getBodyRegex(operationsList: OperationList) {
        const operationSignRegexSource = getOperationSignsRegexSource(operationsList);
        return createMemoRegex(`${operationSignRegexSource}`)
    }

    getOperationSignRegex(operationsList: OperationList) {
        const operationSignsRegexSource = getOperationSignsRegexSource(operationsList);
        return createMemoRegex(operationSignsRegexSource);
    }

    extractOperands() {
        return [];
    }
}