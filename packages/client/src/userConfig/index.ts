import {UserConfigFetcher} from "./domain/UserConfigFetcher/UserConfigFetcher";
import UserConfigApiService from "./api/UserConfigApiService/UserConfigApiService";
import {ObservableVariable} from "../shared/createEvent/ObservableVariable";
import {UserConfigResponseBody} from "@calculator/common";
import {createAsyncEvent} from "../shared/createEvent/createAsyncEvent";
import {
    wrapAsyncEventWithLoadingAndErrorHandling
} from "../shared/createEvent/wrapAsyncEventWithLoadingAndErrorHandling";

const userConfigFetcher = new UserConfigFetcher(UserConfigApiService);

export const userConfigLoadingVar = new ObservableVariable<boolean>(false);
export const userConfigValueVar = new ObservableVariable<UserConfigResponseBody | undefined>();
export const userConfigErrorVar = new ObservableVariable<Error | undefined>();

const getUserConfigEvent = createAsyncEvent(userConfigValueVar, async () => {
    const res = await userConfigFetcher.getUserConfig();
    return res.data;
});

export const fetchUserConfig = wrapAsyncEventWithLoadingAndErrorHandling(
    getUserConfigEvent,
    userConfigLoadingVar,
    userConfigErrorVar
);
