import {UserConfigFetcher} from "./domain/UserConfigFetcher/UserConfigFetcher";
import UserConfigApiService from "./api/UserConfigApiService/UserConfigApiService";
import {createAsyncEvent} from "../shared/createEvent/createAsyncEvent";
import {userConfigValueVar} from "./variables";

const userConfigFetcher = new UserConfigFetcher(UserConfigApiService);

export const getUserConfigEvent = createAsyncEvent(userConfigValueVar, async () => {
    const res = await userConfigFetcher.getUserConfig();
    return res.data;
});

