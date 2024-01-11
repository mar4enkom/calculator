import {RouteList} from "../../../routes/types";
import {Endpoints} from "@calculator/common";
import {configController} from "@/config/entryPoints/ConfigController";

export const userConfigRoutes: RouteList = [
    {
        method: "get",
        endpoint: Endpoints.CONFIG,
        callback: configController.getUserConfig,
    },
]