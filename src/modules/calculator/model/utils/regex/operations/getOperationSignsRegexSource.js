import {getOperationSignsGroupRegex} from "./getOperationSignsGroupRegex.js";

export function getOperationSignsRegexSource(operationsList) {
    const signSymbols = operationsList.map(el => el.sign);
    return getOperationSignsGroupRegex(signSymbols);
}

