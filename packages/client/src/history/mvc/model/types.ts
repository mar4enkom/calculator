import {AppEvent} from "@/shared/helpers/model/AppEvent";
import {CalculationHistoryActionPayload, CalculationHistory} from "@calculator/common";
import {ObservableVariable} from "@/shared/helpers/model/ObservableVariable";
import {ErrorObservableVariable, LoadingObservableVariable} from "@/shared/helpers/model/types";

export interface HistoryEvents {
    onShowDialog: AppEvent<undefined>;
    onHideDialog: AppEvent<undefined>;
    onFetchLastHistoryRecords: AppEvent<CalculationHistoryActionPayload>
}

export interface HistoryVariables {
    showDialog: ObservableVariable<boolean>;
    value: ObservableVariable<CalculationHistory | undefined>;
    loading: LoadingObservableVariable;
    error: ErrorObservableVariable;
}