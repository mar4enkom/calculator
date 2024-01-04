import {LoadingObservableVariable} from "../../shared/createEvent/types";
import {ObservableVariable} from "../../shared/createEvent/ObservableVariable";
import {UserConfigResponseBody} from "@calculator/common";
import {AppEvent} from "../../shared/createEvent/AppEvent";

export interface UserConfigVariables {
    userConfigValue: ObservableVariable<UserConfigResponseBody | undefined>,
    userConfigError: ObservableVariable<Error | undefined>,
    userConfigLoading: LoadingObservableVariable,
}

export interface UserConfigEvents {
    onFetchUserConfig: AppEvent<undefined>;
}