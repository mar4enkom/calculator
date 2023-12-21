import {Symbols} from "@calculator/common";

export function parenthesize(expression: string): string {
    return `${Symbols.LP}${expression}${Symbols.RP}`;
}