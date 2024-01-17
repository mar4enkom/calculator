import {HistoryView} from "@/history/mvc/view/HistoryView";
import {HistoryViewCreator} from "@/history/vistoryViewCreator/HistoryViewCreator";
import {historyEvents} from "@/history/mvc/model/events";
import {calculatorEvents, calculatorVariables} from "@/calculator";
import {HistoryController} from "@/history/mvc/controller/HistoryController";
import {historyVariables} from "@/history/mvc/model/variables";


export function initHistory(): HistoryView {
    const viewCreator = new HistoryViewCreator(historyEvents, calculatorEvents, calculatorVariables);
    const controller = new HistoryController(historyVariables, historyEvents);
    controller.setupEventsSubscriptions();

    return new HistoryView(viewCreator, historyVariables);
}