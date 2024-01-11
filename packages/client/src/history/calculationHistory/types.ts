import {
    CalculationHistory as CalculationHistoryType,
    CalculationHistoryItem,
    GetHistoryActionPayload
} from "@calculator/common";

export interface CalculationHistory {
    getHistory(payload: GetHistoryActionPayload): Promise<CalculationHistoryType>;
    addHistoryRecord(payload: CalculationHistoryItem): CalculationHistoryType;
}