import {HttpMethod} from "../types/common/common";
import {Endpoints} from "../constants/api/endpoints";

export type CommonRoute = {
    readonly httpMethods: HttpMethod[];
}

export type CommonRoutes = Record<Endpoints, CommonRoute>;

export const commonRoutes: CommonRoutes = {
    [Endpoints.CALCULATE]: {
        httpMethods: [HttpMethod.POST],
    },
    [Endpoints.CONFIG]: {
        httpMethods: [HttpMethod.GET],
    },
    [Endpoints.HISTORY]: {
        httpMethods: [HttpMethod.GET, HttpMethod.POST],
    },
    [Endpoints.USERS]: {
        httpMethods: [HttpMethod.GET, HttpMethod.POST],
    },
}