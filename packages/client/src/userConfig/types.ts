import {userConfigErrorVar, userConfigLoadingVar, userConfigValueVar} from "./variables";
import {onFetchUserConfig} from "./events";

export interface UserConfigVariables {
    value: typeof userConfigValueVar,
    error: typeof userConfigErrorVar,
    loading: typeof userConfigLoadingVar,
}

export interface UserConfigEvents {
    onFetchUserConfig: typeof onFetchUserConfig;
}