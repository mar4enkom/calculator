import {getOperationSignsGroupRegexSource} from "./getOperationSignsGroupRegexSource.js";

export function getOperationSignsRegexSource(operationsList) {
    const signSymbols = operationsList.map(el => el.sign);
    return getOperationSignsGroupRegexSource(signSymbols);
}

