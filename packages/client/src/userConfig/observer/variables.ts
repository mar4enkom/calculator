import {ObservableVariable} from "../../shared/createEvent/ObservableVariable";
import {UserConfigResponseBody} from "@calculator/common";
import {UserConfigVariables} from "./types";

export const userConfigVariables: UserConfigVariables = {
    userConfigValue: new ObservableVariable(),
    userConfigError: new ObservableVariable(),
    userConfigLoading: new ObservableVariable(false)
}