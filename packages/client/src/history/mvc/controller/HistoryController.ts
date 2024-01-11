import {HistoryEvents, HistoryVariables} from "@/history/mvc/model/types";
import {CalculationHistoryItem, GetHistoryActionPayload} from "@calculator/common";
import {handleUnknownError} from "@/shared/utils/handleUnknownError";
import {CalculationHistory} from "@/history/calculationHistory/types";

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

    private async handleGetHistory(payload: GetHistoryActionPayload): Promise<void> {
        try {
            this.historyVariables.error.setValue(undefined);
            this.historyVariables.loading.setValue(true);

            const response = await this.calculationHistory.getHistory(payload);

            this.historyVariables.value.setValue(response);
        } catch (e) {
            const error = handleUnknownError(e);
            this.historyVariables.error.setValue(error)
        } finally {
            this.historyVariables.loading.setValue(false);
        }
    }

    private handleUpdateHistory(payload: CalculationHistoryItem) {
        const newHistory = this.calculationHistory.addHistoryRecord(payload);
        this.historyVariables.value.setValue(newHistory);
    }
}