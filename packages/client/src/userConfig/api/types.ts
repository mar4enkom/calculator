import {HttpRequestHandler} from "../../shared/api/HttpRequestHandler";
import {UserConfigResponseBody} from "@calculator/common";

export interface UserConfigApiService extends HttpRequestHandler {
    getConfig(): Promise<UserConfigResponseBody>;
};
