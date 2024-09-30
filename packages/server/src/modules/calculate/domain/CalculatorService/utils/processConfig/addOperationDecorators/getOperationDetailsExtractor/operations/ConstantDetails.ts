
import {OperationList} from "@calculator/common";
import {
    OperationDetails
} from "@/calculate/domain/CalculatorService/utils/processConfig/addOperationDecorators/getOperationDetailsExtractor/operations/OperationDetails";
import {
    getOperationSignsRegexSource
} from "@/calculate/domain/CalculatorService/utils/createRegex/operations/getOperationSignsRegexSource";
import {createMemoRegex} from "@/calculate/domain/CalculatorService/utils/createMemoRegex";

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