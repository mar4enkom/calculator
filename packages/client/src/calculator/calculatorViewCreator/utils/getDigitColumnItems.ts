import {DigitSymbols} from "@calculator/common";

export function getDigitColumnItems(digitSymbols: DigitSymbols): string[] {
    return [
        digitSymbols.ONE,
        digitSymbols.TWO,
        digitSymbols.THREE,
        digitSymbols.FOUR,
        digitSymbols.FIVE,
        digitSymbols.SIX,
        digitSymbols.SEVEN,
        digitSymbols.EIGHT,
        digitSymbols.NINE,
        digitSymbols.ZERO,
    ];
}