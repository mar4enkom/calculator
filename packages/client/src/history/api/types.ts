import {CalculationHistory, GetHistoryListBasePayload} from "@calculator/common";
import {HttpRequestHandler} from "@/shared/helpers/api/HttpRequestHandler";

export interface HistoryApiService extends HttpRequestHandler {
    getRecentRecords(payload: GetHistoryListBasePayload): Promise<CalculationHistory>;
}