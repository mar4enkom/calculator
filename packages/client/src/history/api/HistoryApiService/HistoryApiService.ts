import {
    GetHistoryListPayload,
    GetHistoryListSuccessResponse,
    Endpoints, GetHistoryResponseBody, AddHistoryRecordPayload
} from "@calculator/common";
import {HttpRequestHandler} from "@/shared/helpers/api/HttpRequestHandler";

class HistoryApiService extends HttpRequestHandler {
    async getList(payload: GetHistoryListPayload): Promise<GetHistoryResponseBody> {
        const result = await this.post
            <GetHistoryListSuccessResponse>(Endpoints.GET_HISTORY, payload)
        return result.data;
    }

    async addItem(payload: AddHistoryRecordPayload): Promise<void> {
        await this.post(Endpoints.ADD_HISTORY, payload);
    }
}

export const historyApiService = new HistoryApiService();