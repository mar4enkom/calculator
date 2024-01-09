import {UserConfigVariables} from "@/userConfig";
import {ObservableVariable} from "@/shared/helpers/model/ObservableVariable";

export const userConfigVariables: UserConfigVariables = {
    value: new ObservableVariable(),
    error: new ObservableVariable(),
    loading: new ObservableVariable(false)
}