import {ObservableVariable} from "../../shared/createEvent/ObservableVariable";
import {UserConfigVariables} from "./types";

export const userConfigVariables: UserConfigVariables = {
    value: new ObservableVariable(),
    error: new ObservableVariable(),
    loading: new ObservableVariable(false)
}