import {RouteList} from "../../../routes/types";
import {Endpoints} from "@calculator/common";
import {userConfigController} from "@/configuration/entryPoints/UserConfigController";

export const userConfigRoutes: RouteList = [
    {
        method: "get",
        endpoint: Endpoints.USER_CONFIG,
        callback: userConfigController.getUserConfig,
    },
]