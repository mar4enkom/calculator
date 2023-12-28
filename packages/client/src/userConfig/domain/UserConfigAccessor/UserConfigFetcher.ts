import {GetConfigResult, UserConfigApiService} from "../../api/types";
import {UserConfigFetcher as UserConfigFetcherInterface} from "../types";

export class UserConfigFetcher implements UserConfigFetcherInterface {
    private apiService: UserConfigApiService;
    constructor(apiService: UserConfigApiService) {
        this.apiService = apiService;
    }

    async getUserConfig(): Promise<GetConfigResult> {
        return await this.apiService.getConfig();
    }
}