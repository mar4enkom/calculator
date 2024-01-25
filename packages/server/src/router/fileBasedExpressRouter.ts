import {Router} from "express-serve-static-core";
import path from "path";
import fs from "fs";
import express from "express";
import {commonRouter, CommonRouter, Endpoints} from "@calculator/common";

type BaseFunction = (...args: any) => any;

class FileBasedExpressRouterInitializer {
    initRouter(commonRoutes: CommonRouter, expressRouter: Router, rootPath: string, controllerPath: string): Router {
        for(const routesEntry of Object.entries(commonRoutes)) {
            const [key , routeProps] = routesEntry;
            const endpoint = key as Endpoints;

            const callback = this.findControllerMethod(endpoint, rootPath, controllerPath);
            if(callback == null) {
                throw new Error(`Not found controller method for ${key} endpoint`);
            }
            expressRouter[routeProps.method](endpoint, callback);
        }

        return expressRouter
    }

    private findControllerMethod(methodKey: Endpoints, rootPath: string, controllerPath: string): BaseFunction | undefined {
        const modulesFolder = path.join(__dirname, rootPath);
        let controllerMethod;
        fs.readdirSync(modulesFolder).forEach((folder) => {
            try {
                const moduleFolder = path.join(modulesFolder, folder);
                const controllerFilePath = path.join(moduleFolder, controllerPath);
                const foundController = require(controllerFilePath)?.default;
                const foundMethod = foundController?.[methodKey]

                if(foundMethod != null) {
                    if(!this.isValidMethod(foundMethod)) {
                        throw new Error(`Controller should be a function in ${methodKey} controller method`);
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
    commonRouter,
    expressRouter,
    "../modules",
    "controller/expressController.ts"
);
