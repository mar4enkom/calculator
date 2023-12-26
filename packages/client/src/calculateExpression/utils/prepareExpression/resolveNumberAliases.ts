import {CalculateExpressionPayload, Digits} from "@calculator/common";

const OriginalDigits: Record<keyof typeof Digits, string> = {
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

export function applyNumberAliasesForPayload(payload: CalculateExpressionPayload): CalculateExpressionPayload {
    return {
        expression: resolveNumberAliases(payload.expression, Digits)
    };
}

function resolveNumberAliases(expression: string, numberAliases: typeof Digits): string {
    let resultString = expression;

    for (const key of Object.keys(numberAliases) as Array<keyof typeof Digits>) {
        const alias = numberAliases[key];
        const nativeNumber = OriginalDigits[key];

        if(alias === nativeNumber) continue;
        while (resultString.includes(alias)) {
            resultString = resultString.replace(alias, nativeNumber);
        }
    }

    return resultString;
}