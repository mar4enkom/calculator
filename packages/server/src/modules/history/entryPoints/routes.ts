import {Endpoints} from "@calculator/common";
import {RouteList} from "../../../router/types";
import {calculationHistoryController} from "@/history/controller/CalculationHistoryController";

const routes: RouteList = [
    {
        method: "post",
        endpoint: Endpoints.HISTORY_GET,
        callback: calculationHistoryController.getList
    },
    {
        method: "post",
        endpoint: Endpoints.HISTORY_ADD,
        callback: calculationHistoryController.addItem
    }
];

export default routes;