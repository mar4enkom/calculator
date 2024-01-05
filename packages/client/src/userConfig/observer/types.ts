import {ErrorObservableVariable, LoadingObservableVariable} from "../../shared/createEvent/types";
import {ObservableVariable} from "../../shared/createEvent/ObservableVariable";
import {UserConfigResponseBody} from "@calculator/common";
import {AppEvent} from "../../shared/createEvent/AppEvent";

export interface UserConfigVariables {
    value: ObservableVariable<UserConfigResponseBody | undefined>,
    error: ErrorObservableVariable,
    loading: LoadingObservableVariable,
}

export interface UserConfigEvents {
    onFetchUserConfig: AppEvent<undefined>;
}