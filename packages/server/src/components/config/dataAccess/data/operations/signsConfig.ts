import {BasicOperationList} from "@calculator/common";

export const signs: BasicOperationList = [
    {
        name: "degree",
        sign: "°",
        calculateExpression: (degrees) => degrees * (Math.PI / 180)
    }
]