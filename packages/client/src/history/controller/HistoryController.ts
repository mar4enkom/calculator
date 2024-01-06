import {HistoryVariables} from "../observer/types";

export class HistoryController {
    private historyVariables: HistoryVariables;
    constructor(historyVariables: HistoryVariables) {
        this.historyVariables = historyVariables;

        this.onHideDialog = this.onHideDialog.bind(this);
        this.onShowDialog = this.onShowDialog.bind(this);
    }

    onShowDialog() {
        this.historyVariables.showDialog.setValue(true);
    }

    onHideDialog() {
        this.historyVariables.showDialog.setValue(false);
    }
}