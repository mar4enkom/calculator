import {Symbols} from "userConfig/constants/constants";
import {OperationList} from "userConfig/operations/types";
import {createMemoRegex} from "calculatorService/utils/createMemoRegex";
import {getFunctionRegexSource} from "calculatorService/utils/createRegex/operations/getFunctionRegexSource";
import {
    getOperationSignsRegexSource
} from "calculatorService/utils/createRegex/operations/getOperationSignsRegexSource";
import {
    OperationDetails
} from "calculatorService/utils/processConfig/addOperationDecorators/getOperationDetailsExtractor/operations/OperationDetails";

export class FunctionDetails extends OperationDetails {
    getBodyRegex(operationsList: OperationList) {
        return createMemoRegex(getFunctionRegexSource(operationsList))
    }

    extractOperands(sign: string, expression: string) {
        const argsStr = expression.slice(expression.indexOf(Symbols.LP)+1, expression.indexOf(Symbols.RP));
        return argsStr.split(Symbols.COMMA);
    }

    getOperationSignRegex(operationsList: OperationList) {
        const operationSignsRegexSource = getOperationSignsRegexSource(operationsList);
        return createMemoRegex(operationSignsRegexSource);
    }
}