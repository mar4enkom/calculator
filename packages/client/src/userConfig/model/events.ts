import {AppEvent} from "../../shared/helpers/model/AppEvent";
import {UserConfigEvents} from "./types";

export const userConfigEvents: UserConfigEvents = {
    onFetchUserConfig: new AppEvent<undefined>()
}
