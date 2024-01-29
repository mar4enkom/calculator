import {historyVariables} from "@/history/mvc/model/variables";
import {
    AddHistoryRecordPayload, CalculationHistory,
    Endpoints,
    GetHistoryListPayload,
    GetHistoryListSuccessResponse, HistoryItem,
} from "@calculator/common";
import {calculationHistory} from "@/history/calculationHistory/CalculationHistory";
import {historyPaginationParamsBase} from "@/history/mvc/controller/constants";
import {historyEvents} from "@/history/mvc/model/events";
import {apiRoutes} from "@/shared/apiRouter/apiRoutes";
import {beforeRequest} from "@/shared/utils/beforeRequest";
import {handleError} from "@/shared/utils/handleError";

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
            const addHistory = apiRoutes[Endpoints.HISTORY].post.fetch<HistoryItem>;
            const response = await addHistory(payload);
            const newHistory = [response, ...historyVariables.value.getValue() ?? []];
            historyVariables.value.setValue(newHistory);
        } catch (error) {
            handleError(error, historyVariables.error);
        } finally {
            historyVariables.loading.setValue(false);
        }
    }

    private async handleGetHistory(): Promise<void> {
        const newPageNumber = 0;

        const payload = this.getFetchHistoryPayload(newPageNumber);
        historyVariables.hasMore.setValue(true);
        historyVariables.dialogScrollTop.setValue(0);
        historyVariables.pageNumber.setValue(newPageNumber);

        try {
            beforeRequest(historyVariables);
            const getHistory = apiRoutes[Endpoints.HISTORY].get.fetch<GetHistoryListSuccessResponse>;
            const response = await getHistory(payload);
            const {items: newHistoryRecords, totalCount} = response.data;

            historyVariables.value.setValue(newHistoryRecords);

            const hasMore = calculationHistory.hasMore(newHistoryRecords ?? [], totalCount);
            historyVariables.hasMore.setValue(hasMore);
        } catch (error) {
            handleError(error, historyVariables.error);
        } finally {
            historyVariables.loading.setValue(false);
        }
    }

    private async handleLoadMore(): Promise<void> {
        if(historyVariables.hasMore.getValue() === false) return;

        const newPageNumber = (historyVariables.pageNumber.getValue() ?? 0) + 1;
        const prevHistory = historyVariables.value.getValue() ?? [];
        const payload = this.getFetchHistoryPayload(newPageNumber);

        try {
            beforeRequest(historyVariables);
            const getHistory = apiRoutes[Endpoints.HISTORY].get.fetch<GetHistoryListSuccessResponse>;
            const response = await getHistory(payload);
            const {items: newHistoryRecords, totalCount} = response.data;
            const newHistory = [...prevHistory, ...newHistoryRecords];

            const hasMore = calculationHistory.hasMore(newHistory ?? [], totalCount);
            historyVariables.pageNumber.setValue(newPageNumber);
            historyVariables.hasMore.setValue(hasMore);
            historyVariables.value.setValue(newHistory);
        } catch (error) {
            handleError(error, historyVariables.error);
        } finally {
            historyVariables.loading.setValue(false);
        }
    }

    private getFetchHistoryPayload(newPageNumber: number): GetHistoryListPayload {
        return {
            ...historyPaginationParamsBase,
            pageNumber: newPageNumber,
        }
    }
}

export const historyController = new HistoryController();