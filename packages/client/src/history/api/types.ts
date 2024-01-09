import {HttpRequestHandler} from "../../shared/api/HttpRequestHandler";
import {CalculationHistory, CalculationHistoryPayload} from "@calculator/common";

export interface HistoryApiService extends HttpRequestHandler {
    fetchLastHistoryRecords(payload: CalculationHistoryPayload): Promise<CalculationHistory>;
}