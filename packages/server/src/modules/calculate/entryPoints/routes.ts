import {Endpoints} from "@calculator/common";
import {RouteList} from "../../../routes/types";
import {calculatorController} from "@/calculate/controller/CalculatorController";

export const calculateExpressionRoutes: RouteList = [
    {
        method: "post",
        endpoint: Endpoints.CALCULATE,
        callback: calculatorController.calculateExpression
    },
]
