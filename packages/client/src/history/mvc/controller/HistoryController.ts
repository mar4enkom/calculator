import {historyVariables} from "@/history/mvc/model/variables";
import {
    AddHistoryRecordPayload, CalculationHistory,
    Endpoints,
    GetHistoryListPayload,
    GetHistoryListSuccessResponse,
} from "@calculator/common";
import {calculationHistory} from "@/history/calculationHistory/CalculationHistory";
import {historyPaginationParamsBase} from "@/history/mvc/controller/constants";
import {historyEvents} from "@/history/mvc/model/events";
import {apiRoutes} from "@/shared/apiRouter/apiRoutes";
import {BaseController} from "@/shared/helpers/controller/BaseController";

export class HistoryController extends BaseController<CalculationHistory | undefined>{
    constructor() {
        super(historyVariables);
    }
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
        await this.handleAsyncEvent(apiRoutes[Endpoints.HISTORY_ADD].fetch, payload);
    }

    private async handleGetHistory(): Promise<void> {
        const newPageNumber = 0;

        const payload = this.getFetchHistoryPayload(newPageNumber);
        historyVariables.hasMore.setValue(true);
        historyVariables.dialogScrollTop.setValue(0);
        historyVariables.pageNumber.setValue(newPageNumber);

        const fetcher = apiRoutes[Endpoints.HISTORY_GET].fetch;
        await this.handleAsyncEvent<GetHistoryListSuccessResponse>(fetcher, payload, {
            transformAfter(valueBefore) {
                return valueBefore.data.items;
            },
            after({data: {totalCount}}, newHistory) {
                const hasMore = calculationHistory.hasMore(newHistory ?? [], totalCount);
                historyVariables.hasMore.setValue(hasMore);
            }
        })
    }

    private async handleLoadMore(): Promise<void> {
        if(historyVariables.hasMore.getValue() === false) return ;

        const newPageNumber = (historyVariables.pageNumber.getValue() ?? 0) + 1;
        const prevHistory = historyVariables.value.getValue() ?? [];
        const payload: GetHistoryListPayload = this.getFetchHistoryPayload(newPageNumber);

        const fetcher = apiRoutes[Endpoints.HISTORY_GET].fetch;
        await this.handleAsyncEvent<GetHistoryListSuccessResponse>(fetcher, payload, {
            after({data: {totalCount}}, newHistory) {
                const hasMore = calculationHistory.hasMore(newHistory ?? [], totalCount);
                historyVariables.pageNumber.setValue(newPageNumber);
                historyVariables.hasMore.setValue(hasMore);
            },
            transformAfter(newItems) {
                return [...prevHistory, ...newItems.data.items];
            }
        });
    }

    private getFetchHistoryPayload(newPageNumber: number) {
        return {
            ...historyPaginationParamsBase,
            pageNumber: newPageNumber,
        }
    }
}

export const historyController = new HistoryController();