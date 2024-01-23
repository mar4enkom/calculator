import {handleUnknownError} from "@/shared/utils/handleUnknownError";
import {beforeRequest} from "@/shared/utils/beforeRequest";
import {historyVariables} from "@/history/mvc/model/variables";
import {AddHistoryRecordPayload, GetHistoryListPayload} from "@calculator/common";
import {historyApiService} from "@/history/api/HistoryApiService/HistoryApiService";
import {calculationHistory} from "@/history/calculationHistory/CalculationHistory";
import {historyPaginationParamsBase} from "@/history/mvc/controller/constants";
import {historyEvents} from "@/history/mvc/model/events";

export class HistoryController {
    setupEventsSubscriptions(): void {
        historyEvents.onShowDialog.subscribe(this.onShowDialog.bind(this));
        historyEvents.onHideDialog.subscribe(this.onHideDialog.bind(this));
        historyEvents.onGetHistory.subscribe(this.handleGetHistory.bind(this));
        historyEvents.onLoadMore.subscribe(this.handleLoadMore.bind(this));
        historyEvents.onAddRecord.subscribe(this.handleAddRecord.bind(this));
    }

    private onShowDialog() {
        historyVariables.showDialog.setValue(true);
    }

    private onHideDialog() {
        historyVariables.showDialog.setValue(false);
    }

    private async handleAddRecord(payload: AddHistoryRecordPayload) {
        try {
            beforeRequest(historyVariables);
            await historyApiService.addItem(payload);
        } catch (e) {
            const error = handleUnknownError(e);
            historyVariables.error.setValue(error)
        } finally {
            historyVariables.loading.setValue(false);
        }
    }

    private async handleGetHistory(): Promise<void> {
        try {
            const newPageNumber = 0;
            historyVariables.hasMore.setValue(true);
            historyVariables.dialogScrollTop.setValue(0);
            historyVariables.pageNumber.setValue(newPageNumber);
            beforeRequest(historyVariables);

            const payload: GetHistoryListPayload = {
                ...historyPaginationParamsBase,
                pageNumber: newPageNumber,
            };
            const { items: newHistory, totalCount}
                = await historyApiService.getList(payload);
            const hasMore = calculationHistory.hasMore(newHistory, totalCount);

            historyVariables.value.setValue(newHistory);
            historyVariables.hasMore.setValue(hasMore);
        } catch (e) {
            const error = handleUnknownError(e);
            historyVariables.error.setValue(error)
        } finally {
            historyVariables.loading.setValue(false);
        }
    }

    private async handleLoadMore(): Promise<void> {
        try {
            if(historyVariables.hasMore.getValue() === false) return ;
            const newPageNumber = (historyVariables.pageNumber.getValue() ?? 0) + 1;
            const prevHistory = historyVariables.value.getValue() ?? [];
            beforeRequest(historyVariables);

            const payload: GetHistoryListPayload = {
                ...historyPaginationParamsBase,
                pageNumber: newPageNumber,
            };
            const response = await historyApiService.getList(payload);
            const newHistory = [...prevHistory, ...response.items];
            const hasMore = calculationHistory.hasMore(newHistory, response.totalCount);

            historyVariables.pageNumber.setValue(newPageNumber);
            historyVariables.hasMore.setValue(hasMore);
            historyVariables.value.setValue(newHistory);
        } catch (e) {
            const error = handleUnknownError(e);
            historyVariables.error.setValue(error)
        } finally {
            historyVariables.loading.setValue(false);
        }
    }
}

export const historyController = new HistoryController();