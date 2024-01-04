import {AppEvent} from "../../shared/createEvent/AppEvent";
import {UserConfigEvents} from "./types";

export const userConfigEvents: UserConfigEvents = {
    onFetchUserConfig: new AppEvent<undefined>()
}
