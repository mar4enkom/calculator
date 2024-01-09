import {AppEvent} from "../../shared/createEvent/AppEvent";
import {HistoryEvents} from "./types";

export const historyEvents: HistoryEvents = {
    onShowDialog: new AppEvent(),
    onHideDialog: new AppEvent(),
    onFetchLastHistoryRecords: new AppEvent(),
}