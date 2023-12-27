import {Symbols} from "@calculator/common";

type RegexMap = Record<string, RegExp>;

export const Regex: RegexMap = {
    NESTING_WITHOUT_PARENTHESES: new RegExp(`\\${Symbols.LP}[^${Symbols.LP}${Symbols.RP})]+\\${Symbols.RP}`),
    FLOAT_NUMBER: new RegExp(`(?:(?:${Symbols.MINUS}?\\d+(?:\\${Symbols.DOT}\\d+)?)|Infinity)`),
    REGEX_RESERVED_SYMBOL: /^[+*?<>.^!|$(){}-]$/,
}