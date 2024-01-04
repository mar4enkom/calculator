import {UserConfigResponseBody} from "@calculator/common";

export interface UserConfigFetcher {
    getUserConfig(): Promise<UserConfigResponseBody>;
}