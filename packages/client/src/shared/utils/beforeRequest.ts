import {ObservableVariable} from "@/shared/helpers/model/ObservableVariable";
import {VariableError,} from "@/shared/helpers/model/types";

interface BasicVariables {
    value: ObservableVariable<any>,
    loading: ObservableVariable<boolean>,
    error: ObservableVariable<VariableError>,
}

export function beforeRequest({value, loading, error}: BasicVariables): void {
    value.setValue(undefined);
    loading.setValue(true);
    error.setValue(undefined);
}
