import {
    CalculationHistory as CalculationHistoryType, GetHistoryBasePayload, GetHistoryResponseBody,
} from "@calculator/common";

export interface CalculationHistory {
    getRecentRecords(): Promise<GetHistoryResponseBody>;
    hasMoreRecords(history: CalculationHistoryType, totalCount: number): boolean;
}