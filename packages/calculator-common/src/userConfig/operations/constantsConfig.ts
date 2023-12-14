import {BasicOperationList} from "../../types/userConfig";
import {Symbols} from "../constants/constants";

export const constants: BasicOperationList = [
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