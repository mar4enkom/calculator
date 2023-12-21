import {
    getOperationSignsRegexSource
} from "../../../../createRegex/operations/getOperationSignsRegexSource";
import {createMemoRegex} from "../../../../createMemoRegex";
import {Regex} from "../../../../../constants/regex";
import {
    OperationDetails
} from "./OperationDetails";
import {OperationList} from "@calculator/common";

export class SignDetails extends OperationDetails {
    getBodyRegex(operationsList: OperationList): RegExp {
        const operationSignRegexSource = getOperationSignsRegexSource(operationsList);
        return createMemoRegex(`${Regex.FLOAT_NUMBER.source}${operationSignRegexSource}`)
    }
    getOperationSignRegex(operationsList: OperationList): RegExp {
        const operationSignsRegexSource = getOperationSignsRegexSource(operationsList);
        return createMemoRegex(operationSignsRegexSource);
    }
    extractOperands(sign: string, expression: string): string[] {
        return [expression.slice(0, expression.indexOf(sign))];
    }
}