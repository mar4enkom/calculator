import {OperationList} from "userConfig/operations/types";
import {
    getOperationSignsGroupRegexSource
} from "calculatorService/utils/createRegex/operations/getOperationSignsGroupRegexSource";

export function getOperationSignsRegexSource(operationsList: OperationList): string {
    const signSymbols = operationsList.map(el => el.sign);
    return getOperationSignsGroupRegexSource(signSymbols);
}

