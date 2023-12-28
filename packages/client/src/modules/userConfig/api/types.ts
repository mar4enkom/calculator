import {QueryResult} from "../../../shared/api/types";
import {ServerFailResponse, UserConfigSuccessResponse} from "@calculator/common";

export type UserConfigApiResponse = QueryResult<UserConfigSuccessResponse, ServerFailResponse>;
