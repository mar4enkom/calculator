import {safeRegexSymbol} from "../../../../utils/safetyRegexSymbol.js";

export function getOperationsSignRangeRegexSource(operationsList) {
    const signSymbols = operationsList.map(el => el.sign);
    const signSymbolsRegexStr = signSymbols
        .map(s => safeRegexSymbol(s))
        .join('|');
    return `(${signSymbolsRegexStr})`;
}