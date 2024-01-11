import {Config} from "@calculator/common";
import {ObservableVariable} from "@/shared/helpers/model/ObservableVariable";
import {ErrorObservableVariable, LoadingObservableVariable} from "@/shared/helpers/model/types";
import {AppEvent} from "@/shared/helpers/model/AppEvent";

export interface ConfigVariables {
    value: ObservableVariable<Config | undefined>,
    error: ErrorObservableVariable,
    loading: LoadingObservableVariable,
}

export interface ConfigEvents {
    onFetchConfig: AppEvent<undefined>;
}