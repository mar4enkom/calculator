import {Symbols} from "@calculator/common";

export function parenthesize(expression: string, symbols: Symbols): string {
    return `${symbols.LP}${expression}${symbols.RP}`;
}