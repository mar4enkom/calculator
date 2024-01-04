import {UserConfigApiService} from "../../api/types";
import {UserConfigFetcher as UserConfigFetcherInterface} from "../types";
import {UserConfigResponseBody} from "@calculator/common";

export class UserConfigFetcher implements UserConfigFetcherInterface {
    private apiService: UserConfigApiService;
    constructor(apiService: UserConfigApiService) {
        this.apiService = apiService;
    }

    async getUserConfig(): Promise<UserConfigResponseBody> {
        return await this.apiService.getConfig();
    }
}