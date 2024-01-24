import {commonRouter, Endpoints} from "@calculator/common";
import {Router} from "express-serve-static-core";
import {CreateServerRouterArgs, ServerRouterConfig} from "./types";

export function createServerRouterConfig(serverRouter: CreateServerRouterArgs): ServerRouterConfig {
    return Object.keys(commonRouter).reduce((acc, routeKey) => ({
        ...acc,
        [routeKey]: {
            ...commonRouter[routeKey as Endpoints],
            callback: serverRouter[routeKey as Endpoints].callback
        }
    }), {} as ServerRouterConfig)
}

export function initServerRouter(config: ServerRouterConfig, router: Router): Router {
    for(const routerEndpoint of Object.keys(config)) {
        const routeProps = config[routerEndpoint as Endpoints];
        router[routeProps.method](routerEndpoint, routeProps.callback);
    }

    return router;
}