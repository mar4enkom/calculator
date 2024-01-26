import {HttpMethod} from "../types/common/common";
import {Endpoints} from "../constants/api/endpoints";

export type CommonRoute = {
    readonly method: HttpMethod;
}

export type CommonRoutes = Record<Endpoints, CommonRoute>;

export const commonRoutes: CommonRoutes = {
    [Endpoints.CALCULATE]: {
        method: HttpMethod.POST,
    },
    [Endpoints.CONFIG_GET]: {
        method: HttpMethod.GET,
    },
    [Endpoints.HISTORY_GET]: {
        method: HttpMethod.POST,
    },
    [Endpoints.HISTORY_ADD]: {
        method: HttpMethod.POST,
    },
    [Endpoints.USERS_GET]: {
        method: HttpMethod.GET,
    },
    [Endpoints.USERS_ADD]: {
        method: HttpMethod.POST,
    }
}