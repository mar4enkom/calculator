import {userConfigErrorVar, userConfigLoadingVar} from "./variables";
import {userConfigValueVar} from "./variables";
import {UserConfigFetcher} from "./domain/UserConfigFetcher/UserConfigFetcher";
import UserConfigApiService from "./api/UserConfigApiService/UserConfigApiService";
import {onFetchUserConfig} from "./events";
import {UserConfigController} from "./controller/UserConfigController";

const userConfigFetcher = new UserConfigFetcher(UserConfigApiService);
const userConfigController = new UserConfigController({
    loading: userConfigLoadingVar,
    error: userConfigErrorVar,
    value: userConfigValueVar
}, userConfigFetcher);

onFetchUserConfig.subscribe(userConfigController.fetchUserConfigController);

export {
    userConfigLoadingVar,
    userConfigErrorVar,
    userConfigValueVar
}