import {UserConfigController} from "@/userConfig/controller/UserConfigController";
import {userConfigVariables} from "@/userConfig/model/variables";
import {userConfigEvents} from "@/userConfig/model/events";
import UserConfigApiService from "@/userConfig/api/UserConfigApiService/UserConfigApiService";

export function initUserConfig(): void {
    const userConfigController = new UserConfigController(userConfigVariables, userConfigEvents, UserConfigApiService);
    userConfigController.setupEventsSubscriptions();
}