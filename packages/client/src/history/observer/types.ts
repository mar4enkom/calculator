import {AppEvent} from "../../shared/createEvent/AppEvent";
import {ObservableVariable} from "../../shared/createEvent/ObservableVariable";

export interface HistoryEvents {
    onShowDialog: AppEvent<undefined>;
    onHideDialog: AppEvent<undefined>;
}

export interface HistoryVariables {
    showDialog: ObservableVariable<boolean>
}