import {safeRegexSymbol} from "../../safetyRegexSymbol";

export function getOperationSignsGroupRegexSource(signs: string[]): string {
    const signSymbolsRegexStr = signs
        .map(s => safeRegexSymbol(s))
        .join('|');
    return `(?:${signSymbolsRegexStr})`;
}