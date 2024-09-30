import {CommonRoutes, Endpoints, HttpMethod} from "@calculator/common";
import {ApiRouterConfig} from "@/shared/apiRouter/types";
import {HttpRequestHandler} from "@/shared/helpers/api/HttpRequestHandler";

export function createApiRoutes(commonRoutes: CommonRoutes): ApiRouterConfig {
    return Object.entries(commonRoutes).reduce((acc, [routeKey, commonRouteItem]) => {
        const httpMethodList = commonRouteItem.httpMethods;
        return ({
            ...acc,
            [routeKey]: getEndpointRoutes(routeKey as Endpoints, httpMethodList)
        });
    }, {} as ApiRouterConfig)
}

// adds fetch method for each method of endpoint
function getEndpointRoutes<T extends Endpoints>(endpoint: T, httpMethodList: readonly HttpMethod[]): ApiRouterConfig[T] {
    return httpMethodList.reduce((routes, httpMethod) => {
        // @ts-ignore
        routes[httpMethod] = { fetch: getFetchFunction(endpoint, httpMethod) };
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