import {ObservableVariable} from "@/shared/helpers/model/ObservableVariable";
import {VariableError,} from "@/shared/helpers/model/types";

export interface BaseVariables<T = any> {
    value: ObservableVariable<T>,
    loading: ObservableVariable<boolean>,
    error: ObservableVariable<VariableError>,
}

export function beforeRequest({value, loading, error}: BaseVariables): void {
    value.setValue(undefined);
    loading.setValue(true);
    error.setValue(undefined);
}
