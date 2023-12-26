import {BasicOperationList} from "../../../types/api/modules/userConfig";

export const signs: BasicOperationList = [
    {
        name: "degree",
        sign: "°",
        calculateExpression: (degrees) => degrees * (Math.PI / 180)
    }
]