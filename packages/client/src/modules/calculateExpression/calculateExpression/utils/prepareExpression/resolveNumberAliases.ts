import {CalculateExpressionPayload, DigitSymbols} from "@calculator/common";

const OriginalDigits: Record<keyof DigitSymbols, string> = {
    ZERO: "0",
    ONE: "1",
    TWO: "2",
    THREE: "3",
    FOUR: "4",
    FIVE: "5",
    SIX: "6",
    SEVEN: "7",
    EIGHT: "8",
    NINE: "9",
};

export function applyNumberAliasesForPayload(payload: CalculateExpressionPayload, digitSymbols: DigitSymbols): CalculateExpressionPayload {
    return {
        expression: resolveNumberAliases(payload.expression, digitSymbols)
    };
}

function resolveNumberAliases(expression: string, numberAliases: DigitSymbols): string {
    let resultString = expression;

    for (const key of Object.keys(numberAliases) as Array<keyof DigitSymbols>) {
        const alias = numberAliases[key];
        const nativeNumber = OriginalDigits[key];

        if(alias === nativeNumber) continue;
        while (resultString.includes(alias)) {
            resultString = resultString.replace(alias, nativeNumber);
        }
    }

    return resultString;
}