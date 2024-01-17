import {HistoryVariables} from "@/history/mvc/model/types";
import {HistoryApiService} from "@/history/api/types";
import {CalculationHistory as CalculationHistoryInterface} from "./types";
import {
    GetHistoryListPayload, GetHistoryPagination, GetHistoryResponseBody, CalculationHistory as CalculationHistoryType
} from "@calculator/common";

export function getHistoryPaginationParams({pageNumber}: Pick<GetHistoryPagination, "pageNumber">): GetHistoryPagination {
    return {
        pageNumber,
        sortBy: "calculationDate",
        limit: 5,
    }
};

export class CalculationHistory implements CalculationHistoryInterface {
    constructor(
        private historyVariables: HistoryVariables,
        private historyApiService: HistoryApiService
    ) { }

    async getRecentRecords(): Promise<GetHistoryResponseBody> {
        //TODO: move page number to args, maybe i can avoid using model at all?
        const pageNumber = this.historyVariables.pageNumber.getValue();
        const payload: GetHistoryListPayload = {
            ...getHistoryPaginationParams({ pageNumber }),
            userId: "1"
        };
        return await this.historyApiService.getRecentRecords(payload);
    }

    hasMoreRecords(history: CalculationHistoryType, totalCount: number) {
        return history.length < totalCount;
    }
}