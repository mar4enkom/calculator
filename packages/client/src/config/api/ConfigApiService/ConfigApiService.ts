import {
    Endpoints,
    ConfigSuccessResponse
} from "@calculator/common";
import {HttpRequestHandler} from "@/shared/helpers/api/HttpRequestHandler";
import {ConfigApiService as ConfigApiServiceInterface} from "@/config/api/types";

class ConfigApiService extends HttpRequestHandler implements ConfigApiServiceInterface {
    constructor() {
        super(process.env.API_BASE);
    }

    async getConfig() {
        const queryResult = await this.get<
            ConfigSuccessResponse>(Endpoints.CONFIG, undefined);
        return queryResult.data;
    }
}

export const configApiService = new ConfigApiService();
