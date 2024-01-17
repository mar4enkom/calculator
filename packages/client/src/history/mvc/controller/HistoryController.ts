import {HistoryEvents, HistoryVariables} from "@/history/mvc/model/types";
import {handleUnknownError} from "@/shared/utils/handleUnknownError";
import {beforeRequest} from "@/shared/utils/beforeRequest";
import {historyVariables} from "@/history/mvc/model/variables";
import {GetHistoryListPayload} from "@calculator/common";
import {historyApiService} from "@/history/api/HistoryApiService/HistoryApiService";
import {calculationHistory} from "@/history/calculationHistory/CalculationHistory";
import {historyPaginationParamsBase} from "@/history/mvc/controller/constants";

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
            const newPageNumber = 0;
            historyVariables.hasMore.setValue(true);
            historyVariables.dialogScrollTop.setValue(0);
            historyVariables.pageNumber.setValue(newPageNumber);
            beforeRequest(this.historyVariables);

            const payload: GetHistoryListPayload = {
                ...historyPaginationParamsBase,
                pageNumber: newPageNumber,
                userId: "1"
            };
            const { items: newHistory, totalCount}
                = await historyApiService.getRecentRecords(payload);
            const hasMore = calculationHistory.hasMoreRecords(newHistory, totalCount);

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
            if(this.historyVariables.hasMore.getValue() === false) return ;
            const newPageNumber = (historyVariables.pageNumber.getValue() ?? 0) + 1;
            const prevHistory = this.historyVariables.value.getValue() ?? [];
            beforeRequest(this.historyVariables);

            const payload: GetHistoryListPayload = {
                ...historyPaginationParamsBase,
                pageNumber: newPageNumber,
                userId: "1"
            };
            const response = await historyApiService.getRecentRecords(payload);
            const newHistory = [...prevHistory, ...response.items];
            const hasMore = calculationHistory.hasMoreRecords(newHistory, response.totalCount);

            this.historyVariables.pageNumber.setValue(newPageNumber);
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