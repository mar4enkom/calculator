import {UserConfigApiService as UserConfigApiServiceInterface} from "../types"
import {HttpRequestHandler} from "../../../shared/helpers/api/HttpRequestHandler";
import {
    Endpoints,
    UserConfigSuccessResponse
} from "@calculator/common";

class UserConfigApiService extends HttpRequestHandler implements UserConfigApiServiceInterface {
    constructor() {
        super(process.env.API_BASE);
    }

    async getConfig() {
        const queryResult = await this.get<
            UserConfigSuccessResponse>(Endpoints.USER_CONFIG, undefined);
        return queryResult.data;
    }
}

export default new UserConfigApiService();