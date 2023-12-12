import {Symbols} from "userConfig/constants/constants.js";

export function parenthesize(expression: string): string {
    return `${Symbols.LP}${expression}${Symbols.RP}`;
}