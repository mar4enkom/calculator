import {
    getOperationSignsRegexSource
} from "../../../../createRegex/operations/getOperationSignsRegexSource";
import {createMemoRegex} from "../../../../createMemoRegex";
import {Regex} from "../../../../../constants/regex";
import {
    OperationDetails
} from "./OperationDetails";
import {OperationList} from "@calculator/common";

export class OperatorDetails extends OperationDetails {
    getBodyRegex(operationsList: OperationList): RegExp {
        const operationSignsRegexSource = getOperationSignsRegexSource(operationsList);
        return createMemoRegex(`${Regex.FLOAT_NUMBER.source}${operationSignsRegexSource}${Regex.FLOAT_NUMBER.source}`)
    }
    getOperationSignRegex(operationsList: OperationList): RegExp {
        const operationSignsRegexSource = getOperationSignsRegexSource(operationsList);
        return createMemoRegex(`(?<=${Regex.FLOAT_NUMBER.source})${operationSignsRegexSource}`);
    }
    extractOperands(sign: string, expression: string): string[] {
        return expression.split(sign);
    }
}