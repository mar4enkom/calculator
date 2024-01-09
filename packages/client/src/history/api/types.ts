import {HttpRequestHandler} from "../../shared/helpers/api/HttpRequestHandler";
import {CalculationHistory, CalculationHistoryPayload} from "@calculator/common";

export interface HistoryApiService extends HttpRequestHandler {
    fetchLastHistoryRecords(payload: CalculationHistoryPayload): Promise<CalculationHistory>;
}