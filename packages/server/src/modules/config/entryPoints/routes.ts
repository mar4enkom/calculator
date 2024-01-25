import {RouteList} from "../../../router/fileBasedRouter/types";
import {Endpoints, MethodName} from "@calculator/common";
import configController from "@/config/controller/expressController";

const routes: RouteList = [
    {
        method: MethodName.GET,
        endpoint: Endpoints.CONFIG_GET,
        callback: configController[Endpoints.CONFIG_GET],
    },
]

export default routes;