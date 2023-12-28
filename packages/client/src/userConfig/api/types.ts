import {QueryResult} from "../../shared/api/types";
import {HttpRequestHandler} from "../../shared/api/HttpRequestHandler";
import {UserConfigResponseBody, UserConfigSuccessResponse} from "@calculator/common";

export type UserConfigApiResponse = QueryResult<UserConfigSuccessResponse>;
export type GetConfigResult = QueryResult<UserConfigResponseBody>;

export interface UserConfigApiService extends HttpRequestHandler {
    getConfig(): Promise<QueryResult<UserConfigResponseBody>>;
};
