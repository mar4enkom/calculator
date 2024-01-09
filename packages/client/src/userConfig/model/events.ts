import {UserConfigEvents} from "@/userConfig";
import {AppEvent} from "@/shared/helpers/model/AppEvent";

export const userConfigEvents: UserConfigEvents = {
    onFetchUserConfig: new AppEvent<undefined>()
}
