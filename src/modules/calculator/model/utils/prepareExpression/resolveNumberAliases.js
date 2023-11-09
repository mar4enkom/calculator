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
    console.log(numberAliases);

    Object.keys(numberAliases).forEach(key => {
        console.log({key})
        if (numberAliases[key] != null) {
            const alias = numberAliases[key];
            console.log(key);
            const nativeNumber = Numbers[key];
            console.log(nativeNumber);
            while (resultString.includes(alias)) {
                resultString = resultString.replace(alias, key);
            }
        }
    })

    console.log(resultString);
    return resultString;
}