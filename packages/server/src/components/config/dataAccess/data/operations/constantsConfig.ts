import {BasicOperationList} from "@calculator/common/dist/types/modules/userConfig/types";
import {Symbols} from "@/config/dataAccess/data/constants";

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