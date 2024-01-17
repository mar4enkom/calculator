import {ObservableVariable} from "@/shared/helpers/model/ObservableVariable";
import {ErrorObservableVariable, LoadingObservableVariable} from "@/shared/helpers/model/types";

interface BasicVariables {
    value: ObservableVariable<any>,
    loading: LoadingObservableVariable,
    error: ErrorObservableVariable,
}

export function beforeRequest({value, loading, error}: BasicVariables): void {
    value.setValue(undefined);
    loading.setValue(true);
    error.setValue(undefined);
}
