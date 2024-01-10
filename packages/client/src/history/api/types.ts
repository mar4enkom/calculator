import {CalculationHistory, CalculationHistoryActionPayload} from "@calculator/common";
import {HttpRequestHandler} from "@/shared/helpers/api/HttpRequestHandler";

export interface HistoryApiService extends HttpRequestHandler {
    fetchLastHistoryRecords(payload: CalculationHistoryActionPayload): Promise<CalculationHistory>;
}