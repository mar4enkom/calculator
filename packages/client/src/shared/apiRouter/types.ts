import {CommonRoute, commonRoutes} from "@calculator/common";

export type FetchFunction = <T>(args?: any) => Promise<T>;
export type AsyncEventFunction<T> = (args?: any) => Promise<T>;

export type BaseApiRoute = {
    fetch: FetchFunction;
}

export type ApiRouterArgs = Record<keyof typeof commonRoutes, BaseApiRoute>;

export type ApiRoute = CommonRoute & BaseApiRoute;
export type ApiRouterConfig = Record<keyof typeof commonRoutes, ApiRoute>;