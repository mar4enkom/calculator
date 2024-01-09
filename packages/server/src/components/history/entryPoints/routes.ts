import {Endpoints} from "@calculator/common";
import CalculationHistoryController from "@/history/entryPoints/CalculationHistoryController";
import {RouteList} from "../../../routes/types";

export const historyRoutes: RouteList = [
    {
        method: "get",
        endpoint: Endpoints.HISTORY,
        callback: CalculationHistoryController.getLastRecords
    }
]