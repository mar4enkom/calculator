import express from "express";
import {calculateExpressionRoutes} from "../components/calculate/entryPoints/routes";
import {RouteList} from "./types";
import {initAppRoutes} from "./utils/initAppRoutes";
import {userConfigRoutes} from "../components/configuration/entryPoints/routes";

const appRouteList: RouteList = [
    ...calculateExpressionRoutes,
    ...userConfigRoutes,
];

export default initAppRoutes(appRouteList, express.Router());