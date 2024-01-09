import {HistoryEvents} from "@/history/mvc/model/types";
import {AppEvent} from "@/shared/helpers/model/AppEvent";

export const historyEvents: HistoryEvents = {
    onShowDialog: new AppEvent(),
    onHideDialog: new AppEvent(),
    onFetchLastHistoryRecords: new AppEvent(),
}