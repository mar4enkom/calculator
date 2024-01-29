import {Endpoints} from "../constants/api/endpoints";
import {HttpMethod} from "../types/common/common";

export type CommonRoute = {
    readonly httpMethods: HttpMethod[];
}

export const commonRoutes = {
    [Endpoints.CALCULATE]: {
        httpMethods: [HttpMethod.POST] as const,
    },
    [Endpoints.CONFIG]: {
        httpMethods: [HttpMethod.GET] as const,
    },
    [Endpoints.HISTORY]: {
        httpMethods: [HttpMethod.GET, HttpMethod.POST] as const,
    },
    [Endpoints.USERS]: {
        httpMethods: [HttpMethod.GET, HttpMethod.POST] as const,
    },
};

export type CommonRoutes = typeof commonRoutes;