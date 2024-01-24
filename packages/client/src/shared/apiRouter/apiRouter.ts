import {AppRouter, appRouter, Endpoints, MethodName, Route} from "@calculator/common";
import {HttpRequestHandler} from "@/shared/helpers/api/HttpRequestHandler";

export type BaseApiRoute = {
    fetch<T>(args?: any): Promise<T>;
}
export type ApiRouterArgs = Record<keyof typeof appRouter, BaseApiRoute>;

export type ApiRoute = Route & BaseApiRoute;
export type ApiRouterConfig = Record<keyof typeof appRouter, ApiRoute>;

export const apiRouter = ((appRouter: AppRouter): ApiRouterConfig => {
    return Object.keys(appRouter).reduce((acc, appRouterKey) => ({
        ...acc,
        [appRouterKey]: createApiRouteItem(appRouterKey as Endpoints, appRouter)
    }), {} as ApiRouterConfig)
})(appRouter);

function createApiRouteItem(routeEndpoint: Endpoints, appRouter: AppRouter): ApiRoute {
    const currentAppRouterItem = appRouter[routeEndpoint];
    return {
        ...currentAppRouterItem,
        fetch(args: unknown) {
            return getApiServiceCallback(routeEndpoint, currentAppRouterItem.method, args);
        }
    }
}

function getApiServiceCallback<T>(endpoint: Endpoints, method: MethodName, args: unknown): Promise<T> {
    const httpRequestHandler = new HttpRequestHandler();

    return httpRequestHandler[method]<T>(endpoint, args);
}