import {RestRequestBody, RestResponse} from "@/shared/types/express";
import {NextFunction} from "express";
import {appRouter, Route} from "@calculator/common";

export type BaseServerRoute = {
    callback(req: RestRequestBody<any>, res: RestResponse<any>, next: NextFunction): void | Promise<void>;
}
export type CreateServerRouterArgs = Record<keyof typeof appRouter, BaseServerRoute>;

export type ServerRoute = Route & BaseServerRoute;
export type ServerRouterConfig = Record<keyof typeof appRouter, ServerRoute>;
