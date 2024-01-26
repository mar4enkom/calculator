import {CommonRoute, CommonRoutes, Endpoints, HttpMethod} from "@calculator/common";
import {ApiRoute, ApiRouterConfig} from "@/shared/apiRouter/types";
import {HttpRequestHandler} from "@/shared/helpers/api/HttpRequestHandler";

export function createApiRouter(commonRoutes: CommonRoutes): ApiRouterConfig {
    return Object.entries(commonRoutes).reduce((acc, [routeKey, commonRouteItem]) => ({
        ...acc,
        [routeKey]: createApiRouteItem(routeKey as Endpoints, commonRouteItem)
    }), {} as ApiRouterConfig)
}

// adds fetch method for common router
function createApiRouteItem(routeEndpoint: Endpoints, commonRouteItem: CommonRoute): ApiRoute {
    return {
        ...commonRouteItem,
        fetch: getFetchFunction(routeEndpoint, commonRouteItem.method)
    }
}

// creates fetch function for concrete endpoint
function getFetchFunction<T>(endpoint: Endpoints, method: HttpMethod) {
    return (args: unknown): Promise<T> => {
        const httpRequestHandler = new HttpRequestHandler();

        return httpRequestHandler[method]<T>(endpoint, args);
    }
}