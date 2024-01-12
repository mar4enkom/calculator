import {
    CalculationHistory, GetHistoryActionPayload, CalculationHistoryPayload,
    CalculationHistorySuccessResponse,
    Endpoints
} from "@calculator/common";
import {HttpRequestHandler} from "@/shared/helpers/api/HttpRequestHandler";
import {HistoryApiService as HistoryApiServiceInterface} from "@/history/api/types";

class HistoryApiService extends HttpRequestHandler implements HistoryApiServiceInterface {
    async getRecentRecords(payload: GetHistoryActionPayload): Promise<CalculationHistory> {
        const requestPayload: CalculationHistoryPayload = {
            ...payload,
            sortBy: "calculationDate",
            limit: 5,
            pageNumber: 0,
        };
        const result = await this.post
            <CalculationHistorySuccessResponse>(Endpoints.HISTORY, requestPayload)
        return result.data;
    }
}

export const historyApiService = new HistoryApiService();