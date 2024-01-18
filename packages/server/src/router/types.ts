import {Endpoints} from "@calculator/common";
import {RestRequestBody, RestResponse} from "../shared/types/express";
import {NextFunction} from "express";

type MethodName = "get" | "post" | "put" | "delete"

export type Route = {
    readonly method: MethodName;
    readonly endpoint: Endpoints;
    callback(req: RestRequestBody<any>, res: RestResponse<any>, next: NextFunction): void | Promise<void>;
}

export type RouteList = Route[];