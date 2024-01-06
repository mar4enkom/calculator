import {HistoryViewService} from "../view/HistoryViewService";
import {HistoryEvents, HistoryVariables} from "../observer/types";
import {HistoryController} from "../controller/HistoryController";

export class History {
    private viewService: HistoryViewService;
    private historyEvents: HistoryEvents;
    private historyVariables: HistoryVariables;
    private controller: HistoryController;
    constructor(uiCreator: HistoryViewService, historyEvents: HistoryEvents, historyVariables: HistoryVariables, controller: HistoryController) {
        this.viewService = uiCreator;
        this.historyEvents = historyEvents;
        this.historyVariables = historyVariables;
        this.controller = controller;

        this.setupVariablesSubscriptions();
        this.setupEventsSubscriptions();
    }

    getHistoryUI() {
        return this.viewService.createHistoryUI();
    }

    private setupVariablesSubscriptions() {
        this.historyVariables.showDialog.subscribe(this.viewService.renderDialog);
    }

    private setupEventsSubscriptions() {
        this.historyEvents.onShowDialog.subscribe(this.controller.onShowDialog);
        this.historyEvents.onHideDialog.subscribe(this.controller.onHideDialog);
    }
}