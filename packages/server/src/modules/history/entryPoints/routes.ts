import {Endpoints, MethodName} from "@calculator/common";
import {RouteList} from "../../../router/fileBasedRouter/types";
import historyController from "@/history/controller/expressController";

const routes: RouteList = [
    {
        method: MethodName.POST,
        endpoint: Endpoints.HISTORY_GET,
        callback: historyController[Endpoints.HISTORY_GET]
    },
    {
        method: MethodName.POST,
        endpoint: Endpoints.HISTORY_ADD,
        callback: historyController[Endpoints.HISTORY_ADD]
    }
];

export default routes;