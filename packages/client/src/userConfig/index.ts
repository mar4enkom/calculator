import {UserConfigFetcher} from "./domain/UserConfigFetcher/UserConfigFetcher";
import UserConfigApiService from "./api/UserConfigApiService/UserConfigApiService";
import {ObservableVariable} from "../shared/createEvent/ObservableVariable";
import {ErrorBody, UserConfigResponseBody} from "@calculator/common";
import {createAsyncEvent} from "../shared/createEvent/createAsyncEvent";

const userConfigFetcher = new UserConfigFetcher(UserConfigApiService);

export const userConfigLoadingVar = new ObservableVariable<boolean>(false);
export const userConfigValueVar = new ObservableVariable<UserConfigResponseBody | undefined>();
export const userConfigErrorVar = new ObservableVariable<ErrorBody | undefined>();

const handleFetchUserConfig = createAsyncEvent(userConfigValueVar, async () => {
    const res = await userConfigFetcher.getUserConfig();
    return res.data;
});

export async function fetchUserConfig(): Promise<void> {
    try {
        userConfigLoadingVar.setValue(true);
        await handleFetchUserConfig();
        userConfigLoadingVar.setValue(false);
    } catch (e) {
        throw e;
    }
}