export const operators = [
    {
        name: "power",
        sign: "^",
        calc: (a, b) => Math.pow(a,b),
        priority: 0,
    },
    {
        name: "Multiply",
        sign: "*",
        calc: (a, b) => a * b,
        priority: 1,
    },
    {
        name: "Divide",
        sign: "/",
        calc: (a, b) => a / b,
        priority: 1,
    },
    {
        name: "Remainder of the division",
        sign: "%",
        calc: (a, b) => a % b,
        priority: 1,
    },
    {
        name: "Add",
        sign: "+",
        calc: (a, b) => a + b,
        priority: 2,
    },
    {
        name: "Subtract",
        sign: "-",
        calc: (a, b) => a - b,
        priority: 2,
    }
];