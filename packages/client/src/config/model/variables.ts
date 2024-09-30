import {ObservableVariable} from "@/shared/helpers/model/ObservableVariable";
import {VariableError} from "@/shared/helpers/model/types";
import {Config} from "@calculator/common";

export const configVariables = {
    value: new ObservableVariable<Config | undefined>(),
    error: new ObservableVariable<VariableError>(),
    loading: new ObservableVariable<boolean>(false)
}