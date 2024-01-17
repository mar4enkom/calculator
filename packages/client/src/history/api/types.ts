import {CalculationHistory, GetHistoryBasePayload} from "@calculator/common";
import {HttpRequestHandler} from "@/shared/helpers/api/HttpRequestHandler";

export interface HistoryApiService extends HttpRequestHandler {
    getRecentRecords(payload: GetHistoryBasePayload): Promise<CalculationHistory>;
}