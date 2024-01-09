import {HistoryViewCreator} from "./vistoryViewCreator/HistoryViewCreator";
import {HistoryView} from "./mvc/view/HistoryView";
import {historyEvents} from "./mvc/model/events";
import {historyVariables} from "./mvc/model/variables";
import {HistoryController} from "./mvc/controller/HistoryController";
import {calculatorEvents, calculatorVariables} from "../calculator";
import {HistoryApiService} from "./api/HistoryApiService/HistoryApiService";

export function initHistory(): HistoryView {
    const apiService = new HistoryApiService();
    const viewCreator = new HistoryViewCreator(historyEvents, calculatorEvents, calculatorVariables);
    const controller = new HistoryController(historyVariables, historyEvents, apiService);
    controller.setupEventsSubscriptions();

    return new HistoryView(viewCreator, historyVariables);
}