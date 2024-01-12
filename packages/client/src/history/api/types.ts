import {CalculationHistory, GetHistoryActionPayload} from "@calculator/common";
import {HttpRequestHandler} from "@/shared/helpers/api/HttpRequestHandler";

export interface HistoryApiService extends HttpRequestHandler {
    getRecentRecords(payload: GetHistoryActionPayload): Promise<CalculationHistory>;
}