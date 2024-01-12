import {HistoryEvents, HistoryVariables} from "@/history/mvc/model/types";
import {HistoryItem, GetHistoryListBasePayload} from "@calculator/common";
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
        this.historyEvents.onAddHistoryRecord.subscribe(this.handleUpdateHistory.bind(this));
    }

    private onShowDialog() {
        this.historyVariables.showDialog.setValue(true);
    }

    private onHideDialog() {
        this.historyVariables.showDialog.setValue(false);
    }

    private async handleGetHistory(payload: GetHistoryListBasePayload): Promise<void> {
        try {
            beforeRequest(this.historyVariables, false);
            const response = await this.calculationHistory.getRecentRecords(payload);

            this.historyVariables.value.setValue(response);
        } catch (e) {
            const error = handleUnknownError(e);
            this.historyVariables.error.setValue(error)
        } finally {
            this.historyVariables.loading.setValue(false);
        }
    }

    private handleUpdateHistory(payload: HistoryItem) {
        const newHistory = this.calculationHistory.addRecord(payload);
        this.historyVariables.value.setValue(newHistory);
    }
}