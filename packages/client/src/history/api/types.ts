import {CalculationHistory, CalculationHistoryPayload} from "@calculator/common";
import {HttpRequestHandler} from "@/shared/helpers/api/HttpRequestHandler";

export interface HistoryApiService extends HttpRequestHandler {
    fetchLastHistoryRecords(payload: CalculationHistoryPayload): Promise<CalculationHistory>;
}