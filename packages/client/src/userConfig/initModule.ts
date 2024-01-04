import {UserConfigFetcher} from "./userConfig/UserConfigFetcher/UserConfigFetcher";
import UserConfigApiService from "./api/UserConfigApiService/UserConfigApiService";
import {UserConfigController} from "./controller/UserConfigController";
import {userConfigVariables} from "./observer/variables";
import {userConfigEvents} from "./observer/events";

export function initModule() {
    const userConfigFetcher = new UserConfigFetcher(UserConfigApiService);
    const userConfigController = new UserConfigController(userConfigVariables, userConfigFetcher);

    userConfigEvents.onFetchUserConfig.subscribe(userConfigController.fetchUserConfigController);
}