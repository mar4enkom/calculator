import {RouteList} from "../../../routes/types";
import {Endpoints} from "@calculator/common";
import UserConfigController from "./UserConfigController";

export const userConfigRoutes: RouteList = [
    {
        method: "get",
        endpoint: Endpoints.USER_CONFIG,
        callback: UserConfigController.getUserConfig
    },
]