import {
    CalculationHistory as CalculationHistoryType, GetHistoryBasePayload,
} from "@calculator/common";

export interface CalculationHistory {
    getRecentRecords(): Promise<CalculationHistoryType>;
}