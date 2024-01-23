import {Endpoints, MethodName} from "@calculator/common";
import {RouteList} from "../../../router/types";
import {calculationHistoryController} from "@/history/controller/CalculationHistoryController";

const routes: RouteList = [
    {
        method: MethodName.POST,
        endpoint: Endpoints.HISTORY_GET,
        callback: calculationHistoryController.getHistory
    },
    {
        method: MethodName.POST,
        endpoint: Endpoints.HISTORY_ADD,
        callback: calculationHistoryController.addHistory
    }
];

export default routes;