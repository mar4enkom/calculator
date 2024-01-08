import {AppEvent} from "../../shared/createEvent/AppEvent";
import {ObservableVariable} from "../../shared/createEvent/ObservableVariable";
import {CalculationHistory, CalculationHistoryPayload} from "@calculator/common";
import {ErrorObservableVariable, LoadingObservableVariable} from "../../shared/createEvent/types";

export interface HistoryEvents {
    onShowDialog: AppEvent<undefined>;
    onHideDialog: AppEvent<undefined>;
    onFetchHistory: AppEvent<CalculationHistoryPayload>
}

export interface HistoryVariables {
    showDialog: ObservableVariable<boolean>;
    value: ObservableVariable<CalculationHistory | undefined>;
    loading: LoadingObservableVariable;
    error: ErrorObservableVariable;
}