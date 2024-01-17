import {
    CalculationHistory, GetHistoryListPayload,
    GetHistoryListSuccessResponse,
    Endpoints, GetHistoryResponseBody
} from "@calculator/common";
import {HttpRequestHandler} from "@/shared/helpers/api/HttpRequestHandler";
import {HistoryApiService as HistoryApiServiceInterface} from "@/history/api/types";

class HistoryApiService extends HttpRequestHandler implements HistoryApiServiceInterface {
    async getRecentRecords(payload: GetHistoryListPayload): Promise<GetHistoryResponseBody> {
        const result = await this.post
            <GetHistoryListSuccessResponse>(Endpoints.HISTORY, payload)
        return result.data;
    }
}

export const historyApiService = new HistoryApiService();