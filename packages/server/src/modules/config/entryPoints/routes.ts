import {RouteList} from "../../../router/types";
import {Endpoints} from "@calculator/common";
import {configController} from "@/config/controller/ConfigController";

const routes: RouteList = [
    {
        method: "get",
        endpoint: Endpoints.CONFIG_GET,
        callback: configController.getUserConfig,
    },
]

export default routes;