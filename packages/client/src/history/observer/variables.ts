import {HistoryVariables} from "./types";
import {ObservableVariable} from "../../shared/createEvent/ObservableVariable";

export const historyVariables: HistoryVariables = {
    showDialog: new ObservableVariable(true),
    loading: new ObservableVariable(false),
    value: new ObservableVariable(),
    error: new ObservableVariable(),
}