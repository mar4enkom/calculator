import {Symbols} from "../constants/constants.js";

export const constants = [
    {
        name: "pi",
        sign: "π",
        calc: () => Math.PI
    },
    {
        name: "e",
        sign: "e",
        calc: () => Math.E,
    },
    {
        name: "Infinity",
        sign: Symbols.INFINITY,
        calc: () => Infinity,
    }
];