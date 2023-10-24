export const operatorsHighPriority = [
    {
        name: "Multiply",
        sign: "*",
        calc: (a, b) => a * b,
    },
    {
        name: "Divide",
        sign: "/",
        calc: (a, b) => a / b,
    },
    {
        name: "Remainder of the division",
        sign: "%",
        calc: (a, b) => a % b,
    }
];

export const operatorsLowPriority = [
    {
        name: "Add",
        sign: "+",
        calc: (a, b) => a + b,
    },
    {
        name: "Subtract",
        sign: "-",
        calc: (a, b) => a - b,
    }
];