import {safeRegexSymbol} from "../../safetyRegexSymbol.js";

export function getOperationSignsGroupRegexSource(signs) {
    const signSymbolsRegexStr = signs
        .map(s => safeRegexSymbol(s))
        .join('|');
    return `(${signSymbolsRegexStr})`;
}