import {Config} from "@calculator/common";
import {HttpRequestHandler} from "@/shared/helpers/api/HttpRequestHandler";

export interface ConfigApiService extends HttpRequestHandler {
    getConfig(): Promise<Config>;
};
