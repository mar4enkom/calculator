import {CommonRoute, commonRouter} from "@calculator/common";

export type FetchFunction = <T>(args?: any) => Promise<T>;

export type BaseApiRoute = {
    fetch: FetchFunction;
}

export type ApiRouterArgs = Record<keyof typeof commonRouter, BaseApiRoute>;

export type ApiRoute = CommonRoute & BaseApiRoute;
export type ApiRouterConfig = Record<keyof typeof commonRouter, ApiRoute>;