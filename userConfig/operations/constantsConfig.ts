import {Symbols} from "userConfig/constants/constants.js";
import {BaseOperationList} from "./types";

export const constants: BaseOperationList = [
    {
        name: "pi",
        sign: "π",
        calculateExpression: () => Math.PI
    },
    {
        name: "e",
        sign: "e",
        calculateExpression: () => Math.E,
    },
    {
        name: "Infinity",
        sign: Symbols.INFINITY,
        calculateExpression: () => Infinity,
    }
];