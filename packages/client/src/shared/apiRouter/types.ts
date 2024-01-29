import {CommonRoutes} from "@calculator/common";

export type FetchFunction = <T>(args?: any) => Promise<T>;
export type AsyncEventFunction<T> = (args?: any) => Promise<T>;

export type ApiRoute = { fetch: FetchFunction };

export type ApiRouterConfig = {
    [K in keyof CommonRoutes]: {
        [M in CommonRoutes[K]['httpMethods'][number]]: { fetch: FetchFunction };
    };
};