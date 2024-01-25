import {MethodName} from "../types/common/common";
import {Endpoints} from "../constants/api/endpoints";

export type CommonRoute = {
    readonly method: MethodName;
}

export type CommonRoutes = Record<Endpoints, CommonRoute>;

export const commonRoutes: CommonRoutes = {
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