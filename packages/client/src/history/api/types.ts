import {CalculationHistory, GetHistoryActionPayload} from "@calculator/common";
import {HttpRequestHandler} from "@/shared/helpers/api/HttpRequestHandler";

export interface HistoryApiService extends HttpRequestHandler {
    fetchLastHistoryRecords(payload: GetHistoryActionPayload): Promise<CalculationHistory>;
}