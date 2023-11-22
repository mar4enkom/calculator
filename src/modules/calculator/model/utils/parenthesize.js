import {Symbols} from "UserConfig/constants/constants.js";

export function parenthesize(expression) {
    return `${Symbols.LP}${expression}${Symbols.RP}`;
}