
import {OperationList} from "@calculator/common";
import {
    OperationDetails
} from "@/calculate/domain/CalculatorService/utils/processConfig/addOperationDecorators/getOperationDetailsExtractor/operations/OperationDetails";
import {
    getOperationSignsRegexSource
} from "@/calculate/domain/CalculatorService/utils/createRegex/operations/getOperationSignsRegexSource";
import {createMemoRegex} from "@/calculate/domain/CalculatorService/utils/createMemoRegex";
import {RegexMap} from "@/calculate/domain/CalculatorService/constants/regexMap";

export class SignDetails extends OperationDetails {
    getBodyRegex(operationsList: OperationList): RegExp {
        const operationSignRegexSource = getOperationSignsRegexSource(operationsList);
        return createMemoRegex(`${RegexMap.FLOAT_NUMBER.source}${operationSignRegexSource}`)
    }
    getOperationSignRegex(operationsList: OperationList): RegExp {
        const operationSignsRegexSource = getOperationSignsRegexSource(operationsList);
        return createMemoRegex(operationSignsRegexSource);
    }
    extractOperands(sign: string, expression: string): string[] {
        return [expression.slice(0, expression.indexOf(sign))];
    }
}