import {
    CalculationHistory as CalculationHistoryType,
    HistoryItem,
    GetHistoryListBasePayload
} from "@calculator/common";

export interface CalculationHistory {
    getRecentRecords(payload: GetHistoryListBasePayload): Promise<CalculationHistoryType>;
    addRecord(payload: HistoryItem): CalculationHistoryType;
}