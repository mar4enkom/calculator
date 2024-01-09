import {HttpRequestHandler} from "../../shared/helpers/api/HttpRequestHandler";
import {UserConfigResponseBody} from "@calculator/common";

export interface UserConfigApiService extends HttpRequestHandler {
    getConfig(): Promise<UserConfigResponseBody>;
};
