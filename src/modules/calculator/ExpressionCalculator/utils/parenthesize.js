import {Symbols} from "@userConfig/constants/constants.js";

export function parenthesize(expression) {
    return `${Symbols.LP}${expression}${Symbols.RP}`;
}