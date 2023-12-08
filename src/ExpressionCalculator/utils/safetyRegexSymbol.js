import {Regex} from "CalculatorService/constants/regex.js";

export function safeRegexSymbol(s) {
    return Regex.REGEX_RESERVED_SYMBOL.test(s) ? `\\${s}` : s;
}