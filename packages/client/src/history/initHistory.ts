import {HistoryView} from "@/history/mvc/view/HistoryView";
import {HistoryViewCreator} from "@/history/historyViewCreator/HistoryViewCreator";
import {historyController} from "@/history/mvc/controller/HistoryController";


export function initHistory(): HistoryView {
    const viewCreator = new HistoryViewCreator();
    historyController.setupEventsSubscriptions();

    return new HistoryView(viewCreator);
}