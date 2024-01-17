import {
    OperationDetails
} from "@/calculate/domain/CalculatorService/utils/processConfig/addOperationDecorators/getOperationDetailsExtractor/operations/OperationDetails";
import {OperationList} from "@calculator/common";
import {
    getOperationSignsRegexSource
} from "@/calculate/domain/CalculatorService/utils/createRegex/operations/getOperationSignsRegexSource";
import {createMemoRegex} from "@/calculate/domain/CalculatorService/utils/createMemoRegex";
import {RegexMap} from "@/calculate/domain/CalculatorService/constants/regexMap";


export class OperatorDetails extends OperationDetails {
    getBodyRegex(operationsList: OperationList): RegExp {
        const operationSignsRegexSource = getOperationSignsRegexSource(operationsList);
        return createMemoRegex(`${RegexMap.FLOAT_NUMBER.source}${operationSignsRegexSource}${RegexMap.FLOAT_NUMBER.source}`)
    }
    getOperationSignRegex(operationsList: OperationList): RegExp {
        const operationSignsRegexSource = getOperationSignsRegexSource(operationsList);
        return createMemoRegex(`(?<=${RegexMap.FLOAT_NUMBER.source})${operationSignsRegexSource}`);
    }
    extractOperands(sign: string, expression: string): string[] {
        return expression.split(sign);
    }
}