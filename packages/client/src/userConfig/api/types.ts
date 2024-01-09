import {UserConfigResponseBody} from "@calculator/common";
import {HttpRequestHandler} from "@/shared/helpers/api/HttpRequestHandler";

export interface UserConfigApiService extends HttpRequestHandler {
    getConfig(): Promise<UserConfigResponseBody>;
};
