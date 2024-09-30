import {AppEvent} from "@/shared/helpers/model/AppEvent";
import {AddHistoryRecordPayload} from "@calculator/common";

export const historyEvents = {
    onShowDialog: new AppEvent<undefined>(),
    onHideDialog: new AppEvent<undefined>(),
    onGetHistory: new AppEvent<undefined>(),
    onLoadMore: new AppEvent<undefined>(),
    onAddRecord: new AppEvent<AddHistoryRecordPayload>(),
}