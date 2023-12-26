import {RouteList} from "../types";
import {Router} from "express-serve-static-core";

export function initAppRoutes(routes: RouteList, router: Router): Router {
    for (const route of routes) {
        router[route.method](route.endpoint, route.callback);
    }
    return router;
}