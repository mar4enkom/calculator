import {HistoryEvents, HistoryVariables} from "../observer/types";

export class HistoryController {
    private historyVariables: HistoryVariables;
    private historyEvents: HistoryEvents;
    constructor(historyVariables: HistoryVariables, historyEvents: HistoryEvents) {
        this.historyVariables = historyVariables;
        this.historyEvents = historyEvents;
    }

    setupEventsSubscriptions(): void {
        this.historyEvents.onShowDialog.subscribe(this.onShowDialog.bind(this));
        this.historyEvents.onHideDialog.subscribe(this.onHideDialog.bind(this));
    }

    private onShowDialog() {
        this.historyVariables.showDialog.setValue(true);
    }

    private onHideDialog() {
        this.historyVariables.showDialog.setValue(false);
    }
}