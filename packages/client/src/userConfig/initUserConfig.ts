import UserConfigApiService from "./api/UserConfigApiService/UserConfigApiService";
import {UserConfigController} from "./controller/UserConfigController";
import {userConfigVariables} from "./model/variables";
import {userConfigEvents} from "./model/events";

export function initUserConfig(): void {
    const userConfigController = new UserConfigController(userConfigVariables, userConfigEvents, UserConfigApiService);
    userConfigController.setupEventsSubscriptions();
}