import express from "express";
import {calculateExpressionRoutes} from "../components/calculate/entryPoints/routes";
import {RouteList} from "./types";
import {initAppRoutes} from "./utils/initAppRoutes";

const appRouteList: RouteList = [
    ...calculateExpressionRoutes,
];

export default initAppRoutes(appRouteList, express.Router());