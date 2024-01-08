import {HistoryViewService} from "../view/HistoryViewService";
import {HistoryVariables} from "../observer/types";

export class History {
    private viewService: HistoryViewService;
    private historyVariables: HistoryVariables;
    constructor(uiCreator: HistoryViewService, historyVariables: HistoryVariables) {
        this.viewService = uiCreator;
        this.historyVariables = historyVariables;

        this.setupVariablesSubscriptions();
    }

    getHistoryUI() {
        return this.viewService.createHistoryUI();
    }

    private setupVariablesSubscriptions() {
        this.historyVariables.showDialog.subscribe(this.viewService.renderDialog);
    }
}