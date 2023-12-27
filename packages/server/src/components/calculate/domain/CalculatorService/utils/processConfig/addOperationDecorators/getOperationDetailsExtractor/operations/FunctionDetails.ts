import {createMemoRegex} from "../../../../createMemoRegex";
import {getFunctionRegexSource} from "../../../../createRegex/operations/getFunctionRegexSource";
import {
    getOperationSignsRegexSource
} from "../../../../createRegex/operations/getOperationSignsRegexSource";
import {
    OperationDetails
} from "./OperationDetails";
import {OperationList} from "@calculator/common";
import {configStore} from "../../../../../../../../../shared/store/configStore/configStore";

export class FunctionDetails extends OperationDetails {
    getBodyRegex(operationsList: OperationList): RegExp {
        return createMemoRegex(getFunctionRegexSource(operationsList))
    }

    extractOperands(sign: string, expression: string): string[] {
        const { symbols } = configStore.get();
        const argsStr = expression.slice(expression.indexOf(symbols.LP)+1, expression.indexOf(symbols.RP));
        return argsStr.split(symbols.COMMA);
    }

    getOperationSignRegex(operationsList: OperationList): RegExp {
        const operationSignsRegexSource = getOperationSignsRegexSource(operationsList);
        return createMemoRegex(operationSignsRegexSource);
    }
}