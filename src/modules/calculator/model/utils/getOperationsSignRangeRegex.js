import {safeRegexSymbol} from "../../../../utils/safetyRegexSymbol.js";

export function getOperationsSignRangeRegex(operationsList) {
    const signSymbols = operationsList.map(el => el.sign);
    const signSymbolsRegexStr = signSymbols
        .map(s => safeRegexSymbol(s))
        .join('|');
    return new RegExp(`(${signSymbolsRegexStr})`);
}