import {appRouter, Endpoints} from "@calculator/common";
import {Router} from "express-serve-static-core";
import {CreateServerRouterArgs, ServerRouterConfig} from "./types";

export function createServerRouterConfig(serverRouter: CreateServerRouterArgs): ServerRouterConfig {
    return Object.keys(appRouter).reduce((acc, appRouterKey) => {
        return {
            ...acc,
            [appRouterKey]: {
                ...appRouter[appRouterKey as Endpoints],
                callback: serverRouter[appRouterKey as Endpoints].callback
            }
        }
    }, {} as ServerRouterConfig)
}

export function initServerRouter(config: ServerRouterConfig, router: Router): Router {
    Object.keys(config).forEach((routerEndpoint) => {
        const routeProps = config[routerEndpoint as Endpoints];
        router[routeProps.method](routerEndpoint, routeProps.callback);
    });
    return router;
}