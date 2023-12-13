import {getOperationSignsRegexSource} from "calculatorService/utils/createRegex/operations/getOperationSignsRegexSource";
import {OperationList} from "userConfig/operations/types";
import {createMemoRegex} from "calculatorService/utils/createMemoRegex";
import {
    OperationDetails
} from "calculatorService/utils/processConfig/addOperationDecorators/getOperationDetailsExtractor/operations/OperationDetails";

export class ConstantDetails extends OperationDetails {
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