import {AppEvent} from "@/shared/helpers/model/AppEvent";
import {GetHistoryListBasePayload, CalculationHistory, HistoryItem} from "@calculator/common";
import {ObservableVariable} from "@/shared/helpers/model/ObservableVariable";
import {ErrorObservableVariable, LoadingObservableVariable} from "@/shared/helpers/model/types";

export interface HistoryEvents {
    onShowDialog: AppEvent<undefined>;
    onHideDialog: AppEvent<undefined>;
    onGetHistory: AppEvent<GetHistoryListBasePayload>,
    onAddHistoryRecord: AppEvent<HistoryItem>,
}

export interface HistoryVariables {
    showDialog: ObservableVariable<boolean>;
    value: ObservableVariable<CalculationHistory | undefined>;
    loading: LoadingObservableVariable;
    error: ErrorObservableVariable;
    isFetched: ObservableVariable<boolean>;
}