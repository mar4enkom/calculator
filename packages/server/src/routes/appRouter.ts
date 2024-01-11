import express from "express";
import {calculateExpressionRoutes} from "../components/calculate/entryPoints/routes";
import {RouteList} from "./types";
import {initAppRoutes} from "./utils/initAppRoutes";
import {userConfigRoutes} from "@/config/entryPoints/routes";
import {historyRoutes} from "../components/history/entryPoints/routes";

const appRouteList: RouteList = [
    ...calculateExpressionRoutes,
    ...userConfigRoutes,
    ...historyRoutes
];

export default initAppRoutes(appRouteList, express.Router());