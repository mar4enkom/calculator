import {Symbols} from "userConfig/constants/constants";

export function parenthesize(expression: string): string {
    return `${Symbols.LP}${expression}${Symbols.RP}`;
}