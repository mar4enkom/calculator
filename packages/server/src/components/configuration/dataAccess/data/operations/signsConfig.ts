import {BasicOperationList} from "@calculator/common/dist/types/modules/userConfig/types";

export const signs: BasicOperationList = [
    {
        name: "degree",
        sign: "°",
        calculateExpression: (degrees) => degrees * (Math.PI / 180)
    }
]