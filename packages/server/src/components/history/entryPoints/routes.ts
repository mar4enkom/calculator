import {RouteList} from "../../../routes/types";
import {Endpoints} from "@calculator/common";
import CalculationHistoryController from "./CalculationHistoryController";

export const historyRoutes: RouteList = [
    {
        method: "get",
        endpoint: Endpoints.HISTORY,
        callback: CalculationHistoryController.getLastRecords
    }
]