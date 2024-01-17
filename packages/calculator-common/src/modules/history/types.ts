import {AddHistoryRecordPayload} from "./apiTypes";

export interface HistoryItem extends AddHistoryRecordPayload {
    id: string;
    calculationDate: Date;
}

export type CalculationHistory = HistoryItem[];
