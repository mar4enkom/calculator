import {AppEvent} from "../../../shared/helpers/model/AppEvent";
import {ObservableVariable} from "../../../shared/helpers/model/ObservableVariable";
import {CalculationHistory, CalculationHistoryPayload} from "@calculator/common";
import {ErrorObservableVariable, LoadingObservableVariable} from "../../../shared/helpers/model/types";

export interface HistoryEvents {
    onShowDialog: AppEvent<undefined>;
    onHideDialog: AppEvent<undefined>;
    onFetchLastHistoryRecords: AppEvent<CalculationHistoryPayload>
}

export interface HistoryVariables {
    showDialog: ObservableVariable<boolean>;
    value: ObservableVariable<CalculationHistory | undefined>;
    loading: LoadingObservableVariable;
    error: ErrorObservableVariable;
}