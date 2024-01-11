import {Endpoints} from "@calculator/common";
import {RouteList} from "../../../routes/types";
import {calculatorController} from "@/calculate/entryPoints/CalculatorController";

export const calculateExpressionRoutes: RouteList = [
    {
        method: "post",
        endpoint: Endpoints.CALCULATE,
        callback: calculatorController.calculateExpression
    },
]
