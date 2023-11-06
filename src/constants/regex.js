import {Symbols} from "./constants.js";

export const Regex = {
    NESTING_WITHOUT_PARENTHESES: new RegExp(`\\${Symbols.LP}[^${Symbols.LP}${Symbols.RP})]*\\${Symbols.RP}`),
    NUMBER: new RegExp(`${Symbols.MINUS}?\\d+(\\${Symbols.DOT}\\d+)?`),
    REGEX_RESERVED_SYMBOL: /^[+*?<>.^!|$(){}-]$/
}