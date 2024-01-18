import {Endpoints} from "@calculator/common";
import {RouteList} from "../../../router/types";
import {calculatorController} from "@/calculate/controller/CalculatorController";

const routes: RouteList = [
    {
        method: "post",
        endpoint: Endpoints.CALCULATE,
        callback: calculatorController.calculateExpression
    },
]

export default routes;
