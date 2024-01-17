import {CalculationHistory as CalculationHistoryInterface} from "./types";
import {CalculationHistory as CalculationHistoryType} from "@calculator/common";

class CalculationHistory implements CalculationHistoryInterface {
    hasMoreRecords(history: CalculationHistoryType, totalCount: number) {
        return history.length < totalCount;
    }
}

export const calculationHistory = new CalculationHistory();