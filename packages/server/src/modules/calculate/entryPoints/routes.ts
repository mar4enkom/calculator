import {Endpoints, MethodName} from "@calculator/common";
import {RouteList} from "../../../router/fileBasedRouter/types";
import expressController from "@/calculate/controller/expressController";

const routes: RouteList = [
    {
        method: MethodName.POST,
        endpoint: Endpoints.CALCULATE,
        callback: expressController[Endpoints.CALCULATE]
    },
]

export default routes;
