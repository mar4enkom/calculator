import {Router} from "express-serve-static-core";
import path from "path";
import fs from "fs";
import {Route} from "./types";
import express from "express";

class FileBasedExpressRouterInitializer {
    initRouter(expressRouter: Router, rootPath: string, routesPath: string): Router {
        const modulesFolder = path.join(__dirname, rootPath);

        fs.readdirSync(modulesFolder).forEach((folder) => {
            try {
                const moduleFolder = path.join(modulesFolder, folder);
                const routerFilePath = path.join(moduleFolder, routesPath);
                const routeList = require(routerFilePath)?.default;

                for (const route of routeList) {
                    this.processRoute(route, expressRouter, routerFilePath);
                }
            } catch (error) {
                console.error(`Error on loading routes file`, error);
            }
        });

        return expressRouter;
    }

    private processRoute(route: unknown, expressRouter: Router, routerFilePath: string) {
        if (this.isValidRoute(route)) {
            expressRouter[route.method](route.endpoint, route.callback);
        } else {
            throw new Error(`Error: Invalid route definition in ${routerFilePath}, ${route}`);
        }
    }

    private isValidRoute(route: any): route is Route {
        return route &&
            typeof route.method === 'string' &&
            typeof route.endpoint === 'string' &&
            typeof route.callback === 'function';
    }
}

const expressRouter = express.Router();
const routerInitializer = new FileBasedExpressRouterInitializer();

export const appRouter = routerInitializer.initRouter(
    expressRouter,
    "../modules",
    "entryPoints/routes.ts"
);
