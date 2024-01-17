import {
    CalculationHistory, GetHistoryListPayload,
    GetHistoryListSuccessResponse,
    Endpoints
} from "@calculator/common";
import {HttpRequestHandler} from "@/shared/helpers/api/HttpRequestHandler";
import {HistoryApiService as HistoryApiServiceInterface} from "@/history/api/types";

class HistoryApiService extends HttpRequestHandler implements HistoryApiServiceInterface {
    async getRecentRecords(payload: GetHistoryListPayload): Promise<CalculationHistory> {
        const result = await this.post
            <GetHistoryListSuccessResponse>(Endpoints.HISTORY, payload)
        return result.data;
    }
}

export const historyApiService = new HistoryApiService();