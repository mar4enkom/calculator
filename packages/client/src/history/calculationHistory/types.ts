import {
    CalculationHistory as CalculationHistoryType, GetHistoryBasePayload, GetHistoryListPayload, GetHistoryResponseBody,
} from "@calculator/common";

export interface CalculationHistory {
    hasMoreRecords(history: CalculationHistoryType, totalCount: number): boolean;
}