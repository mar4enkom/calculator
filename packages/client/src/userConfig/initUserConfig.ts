import UserConfigApiService from "./api/UserConfigApiService/UserConfigApiService";
import {UserConfigController} from "./controller/UserConfigController";
import {userConfigVariables} from "./observer/variables";
import {userConfigEvents} from "./observer/events";

export function initUserConfig(): void {
    const userConfigController = new UserConfigController(userConfigVariables, UserConfigApiService);

    userConfigEvents.onFetchUserConfig.subscribe(userConfigController.handleFetchUserConfig);
}