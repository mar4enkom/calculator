import {MethodName} from "../types/common/common";
import {Endpoints} from "../constants/api/endpoints";

export type Route = {
    readonly method: MethodName;
}

export type AppRouter = Record<Endpoints, Route>;

export const appRouter: AppRouter = {
    [Endpoints.CALCULATE]: {
        method: MethodName.POST,
    },
    [Endpoints.CONFIG_GET]: {
        method: MethodName.GET,
    },
    [Endpoints.HISTORY_GET]: {
        method: MethodName.POST,
    },
    [Endpoints.HISTORY_ADD]: {
        method: MethodName.POST,
    },
    [Endpoints.USERS_GET]: {
        method: MethodName.GET,
    },
    [Endpoints.USERS_ADD]: {
        method: MethodName.POST,
    }
}