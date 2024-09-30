import {Router} from "express-serve-static-core";
import path from "path";
import fs from "fs";
import express from "express";
import {BaseFunction, commonRoutes, CommonRoutes, Endpoints, HttpMethod} from "@calculator/common";

class FileBasedExpressRouterInitializer {
    initRouter(commonRoutes: CommonRoutes, expressRouter: Router, rootPath: string, controllerPath: string): Router {
        for(const routesEntry of Object.entries(commonRoutes)) {
            const [key , routeProps] = routesEntry;
            const endpoint = key as Endpoints;

            for(const httpMethod of routeProps.httpMethods) {
                const callback = this.findControllerMethod(endpoint, httpMethod, rootPath, controllerPath);
                if(callback == null) {
                    throw new Error(`Not found controller method for ${key} endpoint`);
                }
                expressRouter[httpMethod](endpoint, callback);
            }

        }

        return expressRouter
    }

    private findControllerMethod(endpoint: Endpoints, httpMethod: HttpMethod, rootPath: string, controllerPath: string): BaseFunction | undefined {
        const modulesFolder = path.join(__dirname, rootPath);
        let controllerMethod;
        fs.readdirSync(modulesFolder).forEach((folder) => {
            try {
                const moduleFolder = path.join(modulesFolder, folder);
                const controllerFilePath = path.join(moduleFolder, controllerPath);
                const foundController = require(controllerFilePath)?.default;
                const foundMethod = foundController?.[endpoint]?.[httpMethod];

                if(foundMethod != null) {
                    if(!this.isValidMethod(foundMethod)) {
                        throw new Error(`Controller should be a function in ${endpoint} controller method`);
                    }
                    controllerMethod = foundMethod;
                }

            } catch (error) {
                console.error(`Error on loading routes file`, error);
            }
        });

        return controllerMethod;
    }

    private isValidMethod(method: any): method is BaseFunction {
        return method && typeof method === 'function';
    }
}

const expressRouter = express.Router();
const routerInitializer = new FileBasedExpressRouterInitializer();

export const appRouter = routerInitializer.initRouter(
    commonRoutes,
    expressRouter,
    "../modules",
    "controller/expressController.ts"
);
