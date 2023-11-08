import {Symbols} from "../../../../../userConfig/operations/constants/constants.js";

export function parenthesize(expression) {
    return `${Symbols.LP}${expression}${Symbols.RP}`;
}