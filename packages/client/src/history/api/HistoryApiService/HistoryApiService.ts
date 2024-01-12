import {
    CalculationHistory, GetHistoryListBasePayload, GetHistoryListPayload,
    GetHistoryListSuccessResponse,
    Endpoints
} from "@calculator/common";
import {HttpRequestHandler} from "@/shared/helpers/api/HttpRequestHandler";
import {HistoryApiService as HistoryApiServiceInterface} from "@/history/api/types";

class HistoryApiService extends HttpRequestHandler implements HistoryApiServiceInterface {
    async getRecentRecords(payload: GetHistoryListBasePayload): Promise<CalculationHistory> {
        const requestPayload: GetHistoryListPayload = {
            ...payload,
            sortBy: "calculationDate",
            limit: 5,
            pageNumber: 0,
        };
        const result = await this.post
            <GetHistoryListSuccessResponse>(Endpoints.HISTORY, requestPayload)
        return result.data;
    }
}

export const historyApiService = new HistoryApiService();