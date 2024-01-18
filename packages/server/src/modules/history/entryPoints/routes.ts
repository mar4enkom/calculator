import {Endpoints} from "@calculator/common";
import {RouteList} from "../../../router/types";
import {calculationHistoryController} from "@/history/controller/CalculationHistoryController";

const routes: RouteList = [
    {
        method: "post",
        endpoint: Endpoints.GET_HISTORY,
        callback: calculationHistoryController.getLastRecords
    },
    {
        method: "post",
        endpoint: Endpoints.ADD_HISTORY,
        callback: calculationHistoryController.addRecord
    }
];

export default routes;