import {createServerRouterConfig} from "./utils";
import {Endpoints} from "@calculator/common";
import calculateController from "@/calculate/controller/expressController";
import configController from "@/config/controller/expressController";
import historyController from "@/history/controller/expressController";
import usersController from "@/users/controller/expressController";

export const serverRouterConfig = createServerRouterConfig({
    [Endpoints.CALCULATE]: {
        callback: calculateController[Endpoints.CALCULATE]
    },
    [Endpoints.CONFIG_GET]: {
        callback: configController[Endpoints.CONFIG_GET],
    },
    [Endpoints.HISTORY_GET]: {
        callback: historyController[Endpoints.HISTORY_GET],
    },
    [Endpoints.HISTORY_ADD]: {
        callback: historyController[Endpoints.HISTORY_ADD],
    },
    [Endpoints.USERS_GET]: {
        callback: usersController[Endpoints.USERS_GET]
    },
    [Endpoints.USERS_ADD]: {
        callback: usersController[Endpoints.USERS_ADD]
    }
});
