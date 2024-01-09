import {HistoryApiService as HistoryApiServiceInterface} from "../types";
import {HttpRequestHandler} from "../../../shared/helpers/api/HttpRequestHandler";
import {
    CalculationHistory,
    CalculationHistoryPayload,
    CalculationHistorySuccessResponse,
    Endpoints
} from "@calculator/common";

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