import {HistoryViewService} from "../view/HistoryViewService";
import {History} from "./History";
import {historyEvents} from "../observer/events";
import {historyVariables} from "../observer/variables";
import {HistoryController} from "../controller/HistoryController";
import {calculatorEvents, calculatorVariables} from "../../calculator";

export function initHistory(): History {
    const viewService = new HistoryViewService(historyEvents, calculatorEvents, calculatorVariables);
    const controller = new HistoryController(historyVariables);

    return new History(viewService, historyEvents, historyVariables, controller);
}