import {
    CalculationHistory, CalculationHistoryActionPayload, CalculationHistoryPayload,
    CalculationHistorySuccessResponse,
    Endpoints
} from "@calculator/common";
import {HttpRequestHandler} from "@/shared/helpers/api/HttpRequestHandler";
import {HistoryApiService as HistoryApiServiceInterface} from "@/history/api/types";

export class HistoryApiService extends HttpRequestHandler implements HistoryApiServiceInterface {
    constructor() {
        super(process.env.API_BASE);
    }

    async fetchLastHistoryRecords(payload: CalculationHistoryActionPayload): Promise<CalculationHistory> {
        const requestPayload: CalculationHistoryPayload = {
            ...payload,
            sortBy: "date",
            limit: "5",
            pageNumber: "0",
        };
        const result = await this.get
            <CalculationHistorySuccessResponse>(Endpoints.HISTORY, requestPayload)
        return result.data;
    }
}