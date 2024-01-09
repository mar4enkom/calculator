import {RegexMap} from "@/calculate/domain/CalculatorService/constants/regexMap";

export function safeRegexSymbol(str: string): string {
    return RegexMap.REGEX_RESERVED_SYMBOL.test(str) ? `\\${str}` : str;
}