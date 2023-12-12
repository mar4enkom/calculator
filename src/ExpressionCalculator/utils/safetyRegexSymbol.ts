import {Regex} from "calculatorService/constants/regex";

export function safeRegexSymbol(str: string): string {
    return Regex.REGEX_RESERVED_SYMBOL.test(str) ? `\\${str}` : str;
}