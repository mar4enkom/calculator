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
        this.historyEvents.onLoadMore.subscribe(this.handleLoadMore.bind(this));
    }

    private onShowDialog() {
        this.historyVariables.showDialog.setValue(true);
    }

    private onHideDialog() {
        this.historyVariables.showDialog.setValue(false);
    }

    private async handleGetHistory(): Promise<void> {
        try {
            beforeRequest(this.historyVariables);
            const {
                items: newHistory,
                totalCount
            } = await this.calculationHistory.getRecentRecords();
            const hasMore = this.calculationHistory.hasMoreRecords(newHistory, totalCount)
            this.historyVariables.value.setValue(newHistory);
            this.historyVariables.hasMore.setValue(hasMore);
        } catch (e) {
            const error = handleUnknownError(e);
            this.historyVariables.error.setValue(error)
        } finally {
            this.historyVariables.loading.setValue(false);
        }
    }

    private async handleLoadMore(): Promise<void> {
        try {
            const prevHistory = this.historyVariables.value.getValue() ?? [];
            beforeRequest(this.historyVariables);
            const response = await this.calculationHistory.getRecentRecords();
            const newHistory = [...prevHistory, ...response.items];
            const hasMore = this.calculationHistory.hasMoreRecords(newHistory, response.totalCount);
            this.historyVariables.hasMore.setValue(hasMore);
            this.historyVariables.value.setValue(newHistory);
        } catch (e) {
            const error = handleUnknownError(e);
            this.historyVariables.error.setValue(error)
        } finally {
            this.historyVariables.loading.setValue(false);
        }
    }
}