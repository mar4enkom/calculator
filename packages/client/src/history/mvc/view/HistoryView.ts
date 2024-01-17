import {HistoryViewCreator} from "@/history/historyViewCreator/HistoryViewCreator";
import {historyVariables} from "@/history/mvc/model/variables";

export class HistoryView {
    private viewCreator: HistoryViewCreator;
    constructor(uiCreator: HistoryViewCreator) {
        this.viewCreator = uiCreator;

        this.setupVariablesSubscriptions();
    }

    getHistoryUI() {
        return this.viewCreator.createHistoryUI();
    }

    private setupVariablesSubscriptions() {
        historyVariables.showDialog.subscribe((isShowing) =>
            this.viewCreator.renderDialog(isShowing, document.createElement("div")));
        historyVariables.loading.subscribe(this.viewCreator.renderLoadingDialog)
        historyVariables.value.subscribe((h) => {
            this.viewCreator.renderDialogWithDetails(h)
        });
    }
}