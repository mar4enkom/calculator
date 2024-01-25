import {RestRequestBody, RestResponse} from "@/shared/types/express";
import {NextFunction} from "express";
import {commonRouter, CommonRoute} from "@calculator/common";

export type ExpressCallback = (
    req: RestRequestBody<any>,
    res: RestResponse<any>,
    next: NextFunction
) => Promise<void> | void;

export type BaseServerRoute = {
    callback: ExpressCallback;
}
export type CreateServerRouterArgs = Record<keyof typeof commonRouter, BaseServerRoute>;

export type ServerRoute = CommonRoute & BaseServerRoute;
export type ServerRouterConfig = Record<keyof typeof commonRouter, ServerRoute>;
