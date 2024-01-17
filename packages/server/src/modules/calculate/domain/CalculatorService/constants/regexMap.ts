import {Symbols} from "@calculator/common";

export class RegexMap {
    static NESTING_WITHOUT_PARENTHESES: RegExp;
    static FLOAT_NUMBER: RegExp;
    static REGEX_RESERVED_SYMBOL: RegExp;
    constructor(symbols: Symbols) {
        RegexMap.FLOAT_NUMBER = new RegExp(`(?:(?:${symbols.MINUS}?\\d+(?:\\${symbols.DOT}\\d+)?)|Infinity)`);
        RegexMap.REGEX_RESERVED_SYMBOL = /^[+*?<>.^!|$(){}-]$/;
        RegexMap.NESTING_WITHOUT_PARENTHESES = new RegExp(`\\${symbols.LP}[^${symbols.LP}${symbols.RP})]+\\${symbols.RP}`);
    }
}