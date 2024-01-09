import {AppEvent} from "../../../shared/helpers/model/AppEvent";
import {HistoryEvents} from "./types";

export const historyEvents: HistoryEvents = {
    onShowDialog: new AppEvent(),
    onHideDialog: new AppEvent(),
    onFetchLastHistoryRecords: new AppEvent(),
}