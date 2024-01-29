import {CommonRoutes, Endpoints, HttpMethod} from "@calculator/common";
import {ApiRouterConfig} from "@/shared/apiRouter/types";
import {HttpRequestHandler} from "@/shared/helpers/api/HttpRequestHandler";

export function createApiRoutes(commonRoutes: CommonRoutes): ApiRouterConfig {
    return Object.entries(commonRoutes).reduce((acc, [routeKey, commonRouteItem]) => ({
        ...acc,
        [routeKey]: getEndpointRoutes(routeKey as Endpoints, commonRouteItem.httpMethods)
    }), {} as ApiRouterConfig)
}

// adds fetch method for each method of endpoint
function getEndpointRoutes<T extends Endpoints>(endpoint: T, httpMethodList: HttpMethod[]): ApiRouterConfig[T] {
    return httpMethodList.reduce((routes, httpMethod) => {
        // @ts-ignore
        routes[httpMethod as HttpMethod] = { fetch: getFetchFunction(endpoint, httpMethod) };
        return routes;
    }, {} as ApiRouterConfig[T]);
}

// creates fetch function for concrete method of endpoint
function getFetchFunction<T>(endpoint: Endpoints, method: HttpMethod) {
    return (args: unknown): Promise<T> => {
        const httpRequestHandler = new HttpRequestHandler();

        return httpRequestHandler[method]<T>(endpoint, args);
    }
}