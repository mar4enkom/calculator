import {HistoryViewService} from "../view/HistoryViewService";
import {History} from "./History";
import {historyEvents} from "../observer/events";
import {historyVariables} from "../observer/variables";
import {HistoryController} from "../controller/HistoryController";

export function initHistory(): History {
    const viewService = new HistoryViewService(historyEvents);
    const controller = new HistoryController(historyVariables);

    return new History(viewService, historyEvents, historyVariables, controller);
}