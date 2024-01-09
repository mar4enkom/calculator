import {HistoryViewCreator} from "../../vistoryViewCreator/HistoryViewCreator";
import {HistoryVariables} from "../model/types";

export class HistoryView {
    private viewCreator: HistoryViewCreator;
    private historyVariables: HistoryVariables;
    constructor(uiCreator: HistoryViewCreator, historyVariables: HistoryVariables) {
        this.viewCreator = uiCreator;
        this.historyVariables = historyVariables;

        this.setupVariablesSubscriptions();
    }

    getHistoryUI() {
        return this.viewCreator.createHistoryUI();
    }

    private setupVariablesSubscriptions() {
        this.historyVariables.showDialog.subscribe((isShowing) =>
            this.viewCreator.renderDialog(isShowing, document.createElement("div")));
        this.historyVariables.loading.subscribe(this.viewCreator.renderLoadingDialog)
        this.historyVariables.value.subscribe((history) => {
            this.viewCreator.renderDialogWithDetails(history);
        });
    }
}