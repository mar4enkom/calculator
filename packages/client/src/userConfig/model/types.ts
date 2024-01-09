import {ErrorObservableVariable, LoadingObservableVariable} from "../../shared/helpers/model/types";
import {ObservableVariable} from "../../shared/helpers/model/ObservableVariable";
import {UserConfigResponseBody} from "@calculator/common";
import {AppEvent} from "../../shared/helpers/model/AppEvent";

export interface UserConfigVariables {
    value: ObservableVariable<UserConfigResponseBody | undefined>,
    error: ErrorObservableVariable,
    loading: LoadingObservableVariable,
}

export interface UserConfigEvents {
    onFetchUserConfig: AppEvent<undefined>;
}