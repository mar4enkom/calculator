import {Symbols} from "@calculator/common";

type RegexList = Record<string, RegExp>;

export const Regex: RegexList = {
    NESTING_WITHOUT_PARENTHESES: new RegExp(`\\${Symbols.LP}[^${Symbols.LP}${Symbols.RP})]+\\${Symbols.RP}`),
    FLOAT_NUMBER: new RegExp(`(?:(?:${Symbols.MINUS}?\\d+(?:\\${Symbols.DOT}\\d+)?)|Infinity)`),
    REGEX_RESERVED_SYMBOL: /^[+*?<>.^!|$(){}-]$/,
}