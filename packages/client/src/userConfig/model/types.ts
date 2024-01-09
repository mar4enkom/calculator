import {UserConfigResponseBody} from "@calculator/common";
import {ObservableVariable} from "@/shared/helpers/model/ObservableVariable";
import {ErrorObservableVariable, LoadingObservableVariable} from "@/shared/helpers/model/types";
import {AppEvent} from "@/shared/helpers/model/AppEvent";

export interface UserConfigVariables {
    value: ObservableVariable<UserConfigResponseBody | undefined>,
    error: ErrorObservableVariable,
    loading: LoadingObservableVariable,
}

export interface UserConfigEvents {
    onFetchUserConfig: AppEvent<undefined>;
}