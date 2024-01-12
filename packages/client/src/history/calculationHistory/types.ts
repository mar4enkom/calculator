import {
    CalculationHistory as CalculationHistoryType,
    CalculationHistoryItem,
    GetHistoryActionPayload
} from "@calculator/common";

export interface CalculationHistory {
    getRecentRecords(payload: GetHistoryActionPayload): Promise<CalculationHistoryType>;
    addRecord(payload: CalculationHistoryItem): CalculationHistoryType;
}