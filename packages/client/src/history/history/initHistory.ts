import {HistoryViewService} from "../view/HistoryViewService";
import {History} from "./History";
import {historyEvents} from "../observer/events";
import {historyVariables} from "../observer/variables";
import {HistoryController} from "../controller/HistoryController";
import {calculatorEvents, calculatorVariables} from "../../calculator";
import {HistoryApiService} from "../api/HistoryApiService/HistoryApiService";

export function initHistory(): History {
    const apiService = new HistoryApiService();
    const viewService = new HistoryViewService(historyEvents, calculatorEvents, calculatorVariables);
    const controller = new HistoryController(historyVariables, historyEvents, apiService);
    controller.setupEventsSubscriptions();

    return new History(viewService, historyVariables);
}