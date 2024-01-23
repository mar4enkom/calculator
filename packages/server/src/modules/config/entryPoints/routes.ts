import {RouteList} from "../../../router/types";
import {Endpoints, MethodName} from "@calculator/common";
import {configController} from "@/config/controller/ConfigController";

const routes: RouteList = [
    {
        method: MethodName.GET,
        endpoint: Endpoints.CONFIG_GET,
        callback: configController.getUserConfig,
    },
]

export default routes;