import {getOperationSignsRegexSource} from "calculatorService/utils/createRegex/operations/getOperationSignsRegexSource";
import {createMemoRegex} from "calculatorService/utils/createMemoRegex";
import {
    OperationDetails
} from "calculatorService/utils/processConfig/addOperationDecorators/getOperationDetailsExtractor/operations/OperationDetails";
import {OperationList} from "@calculator/common";

export class ConstantDetails extends OperationDetails {
    getBodyRegex(operationsList: OperationList): RegExp {
        const operationSignRegexSource = getOperationSignsRegexSource(operationsList);
        return createMemoRegex(`${operationSignRegexSource}`)
    }

    getOperationSignRegex(operationsList: OperationList): RegExp {
        const operationSignsRegexSource = getOperationSignsRegexSource(operationsList);
        return createMemoRegex(operationSignsRegexSource);
    }

    extractOperands(): string[] {
        return [];
    }
}