import {HistoryVariables} from "@/history/mvc/model/types";
import {ObservableVariable} from "@/shared/helpers/model/ObservableVariable";

export const historyVariables: HistoryVariables = {
    showDialog: new ObservableVariable(true),
    loading: new ObservableVariable(false),
    value: new ObservableVariable(),
    error: new ObservableVariable(),
    pageNumber: new ObservableVariable(0),
    dialogScrollTop: new ObservableVariable(0),
    hasMore: new ObservableVariable(true),
}