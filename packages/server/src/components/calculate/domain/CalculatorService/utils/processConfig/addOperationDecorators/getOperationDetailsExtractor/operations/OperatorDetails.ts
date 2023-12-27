import {
    getOperationSignsRegexSource
} from "../../../../createRegex/operations/getOperationSignsRegexSource";
import {createMemoRegex} from "../../../../createMemoRegex";
import {RegexMap} from "../../../../../constants/regexMap";
import {
    OperationDetails
} from "./OperationDetails";
import {OperationList} from "@calculator/common";

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