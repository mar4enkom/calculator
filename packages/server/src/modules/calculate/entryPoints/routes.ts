import {Endpoints, MethodName} from "@calculator/common";
import {RouteList} from "../../../router/types";
import {calculatorController} from "@/calculate/controller/CalculatorController";

const routes: RouteList = [
    {
        method: MethodName.POST,
        endpoint: Endpoints.CALCULATE,
        callback: calculatorController.calculateExpression
    },
]

export default routes;
