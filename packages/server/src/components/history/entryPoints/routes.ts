import {Endpoints} from "@calculator/common";
import {RouteList} from "../../../routes/types";
import {calculationHistoryController} from "@/history/entryPoints/CalculationHistoryController";

export const historyRoutes: RouteList = [
    {
        method: "post",
        endpoint: Endpoints.HISTORY,
        callback: calculationHistoryController.getLastRecords
    }
]