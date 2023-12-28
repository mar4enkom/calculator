import {UserConfigApiService as UserConfigApiServiceInterface} from "../types"
import {HttpRequestHandler} from "../../../shared/api/HttpRequestHandler";
import {
    Endpoints,
    ServerFailResponse, UserConfigResponseBody, UserConfigSuccessResponse
} from "@calculator/common";
import {HttpQueryResult, QueryResult} from "../../../shared/api/types";

class UserConfigApiService extends HttpRequestHandler implements UserConfigApiServiceInterface {
    constructor() {
        super(process.env.API_BASE);
    }

    async getConfig() {
        console.log(2);
        const queryResult = await this.get<
            UserConfigSuccessResponse, ServerFailResponse>(Endpoints.USER_CONFIG, undefined);
        console.log(3);
        return this.transformQueryResult(queryResult);
    }

    private transformQueryResult(
        queryResult: HttpQueryResult<UserConfigSuccessResponse>
    ): QueryResult<UserConfigResponseBody> {
        if(queryResult.data != null) return { data: queryResult.data.data, errors: undefined };
        return { data: undefined, errors: queryResult.errors?.errors };
    }
}

export default new UserConfigApiService();