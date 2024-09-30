import {
    OperationDetails
} from "@/calculate/domain/CalculatorService/utils/processConfig/addOperationDecorators/getOperationDetailsExtractor/operations/OperationDetails";
import {OperationList} from "@calculator/common";
import {createMemoRegex} from "@/calculate/domain/CalculatorService/utils/createMemoRegex";
import {
    getFunctionRegexSource
} from "@/calculate/domain/CalculatorService/utils/createRegex/operations/getFunctionRegexSource";
import {configStore} from "@/shared/store/configStore/configStore";
import {
    getOperationSignsRegexSource
} from "@/calculate/domain/CalculatorService/utils/createRegex/operations/getOperationSignsRegexSource";


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