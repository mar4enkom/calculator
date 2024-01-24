import express from "express";
import {initServerRouter} from "./utils";
import {serverRouterConfig} from "./serverRouterConfig";

const expressRouter = express.Router();
export const serverRouter = initServerRouter(serverRouterConfig, expressRouter);
