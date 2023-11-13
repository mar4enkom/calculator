import {safeRegexSymbol} from "../../safetyRegexSymbol.js";

export function getOperationSignsGroupRegex(signs) {
    const signSymbolsRegexStr = signs
        .map(s => safeRegexSymbol(s))
        .join('|');
    return `(${signSymbolsRegexStr})`;
}