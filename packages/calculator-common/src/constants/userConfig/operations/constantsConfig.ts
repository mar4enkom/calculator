import {BasicOperationList} from "../../../types/api/modules/userConfig";
import {Symbols} from "../constants";

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