import {CalculationHistory} from "@calculator/common";

export interface HistoryRepository {
    getLastRecords(): Promise<CalculationHistory>;
}