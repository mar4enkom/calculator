import {HistoryVariables} from "@/history/mvc/model/types";
import {HistoryApiService} from "@/history/api/types";
import {CalculationHistory as CalculationHistoryInterface} from "./types";
import {
    CalculationHistory as CalculationHistoryType, GetHistoryListPayload, GetHistoryPagination,
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

    async getRecentRecords(): Promise<CalculationHistoryType> {
        const pageNumber = this.historyVariables.pageNumber.getValue();
        const payload: GetHistoryListPayload = {
            ...getHistoryPaginationParams({ pageNumber }),
            userId: "1"
        }

        return await this.historyApiService.getRecentRecords(payload);
    }
}