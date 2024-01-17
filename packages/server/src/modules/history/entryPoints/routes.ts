import {Endpoints} from "@calculator/common";
import {RouteList} from "../../../routes/types";
import {calculationHistoryController} from "@/history/controller/CalculationHistoryController";

export const historyRoutes: RouteList = [
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
]