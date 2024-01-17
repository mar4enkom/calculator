import {HistoryEvents, HistoryVariables} from "@/history/mvc/model/types";
import {handleUnknownError} from "@/shared/utils/handleUnknownError";
import {CalculationHistory} from "@/history/calculationHistory/types";
import {beforeRequest} from "@/shared/utils/beforeRequest";

export class HistoryController {
    private historyVariables: HistoryVariables;
    private historyEvents: HistoryEvents;
    private calculationHistory: CalculationHistory;
    constructor(historyVariables: HistoryVariables, historyEvents: HistoryEvents, calculationHistory: CalculationHistory) {
        this.historyVariables = historyVariables;
        this.historyEvents = historyEvents;
        this.calculationHistory = calculationHistory;
    }

    setupEventsSubscriptions(): void {
        this.historyEvents.onShowDialog.subscribe(this.onShowDialog.bind(this));
        this.historyEvents.onHideDialog.subscribe(this.onHideDialog.bind(this));
        this.historyEvents.onGetHistory.subscribe(this.handleGetHistory.bind(this));
    }

    private onShowDialog() {
        this.historyVariables.showDialog.setValue(true);
    }

    private onHideDialog() {
        this.historyVariables.showDialog.setValue(false);
    }

    private async handleGetHistory(): Promise<void> {
        try {
            const prevHistory = this.historyVariables.value.getValue();
            beforeRequest(this.historyVariables);
            const newHistory = await this.calculationHistory.getRecentRecords(prevHistory ?? []);

            const oldPageNumber = this.historyVariables.pageNumber.getValue()! + 1;
            this.historyVariables.value.setValue(newHistory);
            this.historyVariables.pageNumber.setValue(oldPageNumber);
        } catch (e) {
            const error = handleUnknownError(e);
            this.historyVariables.error.setValue(error)
        } finally {
            this.historyVariables.loading.setValue(false);
        }
    }
}