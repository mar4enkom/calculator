import {GetConfigResult} from "../api/types";

export interface UserConfigFetcher {
    getUserConfig(): Promise<GetConfigResult>;
}