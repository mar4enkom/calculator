export const Numbers = {
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

export function resolveNumberAliases(expression, numberAliases) {
    let resultString = expression;

    for (const key of Object.keys(numberAliases)) {
        const alias = numberAliases[key];
        const nativeNumber = Numbers[key];

        if(alias === nativeNumber) continue;
        while (resultString.includes(alias)) {
            resultString = resultString.replace(alias, nativeNumber);
        }
    }

    return resultString;
}