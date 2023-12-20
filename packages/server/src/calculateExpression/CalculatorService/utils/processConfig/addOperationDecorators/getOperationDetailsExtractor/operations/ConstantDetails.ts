import {getOperationSignsRegexSource} from "../../../../createRegex/operations/getOperationSignsRegexSource";
import {createMemoRegex} from "../../../../createMemoRegex";
import {
    OperationDetails
} from "./OperationDetails";
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