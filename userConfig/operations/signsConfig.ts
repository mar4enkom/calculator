import {BaseOperationList} from "./types";

export const signs: BaseOperationList = [
    {
        name: "degree",
        sign: "°",
        calculateExpression: (degrees) => degrees * (Math.PI / 180)
    }
]