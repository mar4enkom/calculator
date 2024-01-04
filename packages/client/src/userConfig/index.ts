import {
    wrapAsyncEventWithLoadingAndErrorHandling
} from "../shared/createEvent/wrapAsyncEventWithLoadingAndErrorHandling";
import {userConfigErrorVar, userConfigLoadingVar} from "./variables";
import {getUserConfigEvent} from "./events";
import {userConfigValueVar} from "./variables";

export const fetchUserConfig = wrapAsyncEventWithLoadingAndErrorHandling(
    getUserConfigEvent,
    userConfigLoadingVar,
    userConfigErrorVar
)

export {
    userConfigLoadingVar,
    userConfigErrorVar,
    userConfigValueVar
}