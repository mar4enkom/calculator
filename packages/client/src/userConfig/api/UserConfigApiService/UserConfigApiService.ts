import {
    Endpoints,
    UserConfigSuccessResponse
} from "@calculator/common";
import {HttpRequestHandler} from "@/shared/helpers/api/HttpRequestHandler";
import {UserConfigApiService as UserConfigApiServiceInterface} from "@/userConfig/api/types";

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

export const userConfigApiService = new UserConfigApiService();
