import {
    CalculationHistory,
    CalculationHistoryPayload,
    CalculationHistorySuccessResponse,
    Endpoints
} from "@calculator/common";
import {HttpRequestHandler} from "@/shared/helpers/api/HttpRequestHandler";
import {HistoryApiService as HistoryApiServiceInterface} from "@/history/api/types";

export class HistoryApiService extends HttpRequestHandler implements HistoryApiServiceInterface {
    constructor() {
        super(process.env.API_BASE);
    }

    async fetchLastHistoryRecords(payload: CalculationHistoryPayload): Promise<CalculationHistory> {
        const result = await this.get
            <CalculationHistorySuccessResponse>(Endpoints.HISTORY, payload)
        return result.data;
    }
}