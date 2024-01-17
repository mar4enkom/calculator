import {AppEvent} from "@/shared/helpers/model/AppEvent";
import {AddHistoryRecordPayload, CalculationHistory} from "@calculator/common";
import {ObservableVariable} from "@/shared/helpers/model/ObservableVariable";
import {ErrorObservableVariable, LoadingObservableVariable} from "@/shared/helpers/model/types";

export interface HistoryEvents {
    onShowDialog: AppEvent<undefined>;
    onHideDialog: AppEvent<undefined>;
    onGetHistory: AppEvent<undefined>,
    onLoadMore: AppEvent<undefined>;
    onAddRecord: AppEvent<AddHistoryRecordPayload>;
}

export interface HistoryVariables {
    showDialog: ObservableVariable<boolean>;
    value: ObservableVariable<CalculationHistory | undefined>;
    loading: LoadingObservableVariable;
    error: ErrorObservableVariable;
    pageNumber: ObservableVariable<number>;
    dialogScrollTop: ObservableVariable<number>;
    hasMore: ObservableVariable<boolean>;
}