import {createMemoRegex} from "../../../../createMemoRegex";
import {getFunctionRegexSource} from "../../../../createRegex/operations/getFunctionRegexSource";
import {
    getOperationSignsRegexSource
} from "../../../../createRegex/operations/getOperationSignsRegexSource";
import {
    OperationDetails
} from "./OperationDetails";
import {OperationList, Symbols} from "@calculator/common";

export class FunctionDetails extends OperationDetails {
    getBodyRegex(operationsList: OperationList): RegExp {
        return createMemoRegex(getFunctionRegexSource(operationsList))
    }

    extractOperands(sign: string, expression: string): string[] {
        const argsStr = expression.slice(expression.indexOf(Symbols.LP)+1, expression.indexOf(Symbols.RP));
        return argsStr.split(Symbols.COMMA);
    }

    getOperationSignRegex(operationsList: OperationList): RegExp {
        const operationSignsRegexSource = getOperationSignsRegexSource(operationsList);
        return createMemoRegex(operationSignsRegexSource);
    }
}