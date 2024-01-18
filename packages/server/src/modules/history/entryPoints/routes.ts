import {Endpoints} from "@calculator/common";
import {RouteList} from "../../../router/types";
import {calculationHistoryController} from "@/history/controller/CalculationHistoryController";

const routes: RouteList = [
    {
        method: "post",
        endpoint: Endpoints.GET_HISTORY,
        callback: calculationHistoryController.getList
    },
    {
        method: "post",
        endpoint: Endpoints.ADD_HISTORY,
        callback: calculationHistoryController.addItem
    }
];

export default routes;