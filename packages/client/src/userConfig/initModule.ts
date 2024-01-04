import UserConfigApiService from "./api/UserConfigApiService/UserConfigApiService";
import {UserConfigController} from "./controller/UserConfigController";
import {userConfigVariables} from "./observer/variables";
import {userConfigEvents} from "./observer/events";

export function initModule() {
    const userConfigController = new UserConfigController(userConfigVariables, UserConfigApiService);

    userConfigEvents.onFetchUserConfig.subscribe(userConfigController.fetchUserConfigController);
}