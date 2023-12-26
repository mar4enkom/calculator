import {Endpoints} from "@calculator/common";
import CalculatorController from "./CalculatorController";
import {RouteList} from "../../routes/types";

export const calculateExpressionRoutes: RouteList = [
    {
        method: "post",
        endpoint: Endpoints.CALCULATE,
        callback: CalculatorController.calculateExpression
    },
]
