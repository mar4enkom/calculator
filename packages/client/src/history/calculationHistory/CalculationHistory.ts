import {CalculationHistory as CalculationHistoryType} from "@calculator/common";

class CalculationHistory {
    hasMoreRecords(history: CalculationHistoryType, totalCount: number): boolean {
        return history.length < totalCount;
    }
}

export const calculationHistory = new CalculationHistory();