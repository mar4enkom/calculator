import {
    getOperationSignsGroupRegexSource
} from "./getOperationSignsGroupRegexSource";
import {OperationList} from "@calculator/common";

export function getOperationSignsRegexSource(operationsList: OperationList): string {
    const signSymbols = operationsList.map(el => el.sign);
    return getOperationSignsGroupRegexSource(signSymbols);
}

