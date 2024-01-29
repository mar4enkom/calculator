import {AddHistoryRecordPayload} from "./apiTypes";

export interface HistoryItem extends AddHistoryRecordPayload {
    id: string;
    createdAt: Date;
}

export type CalculationHistory = HistoryItem[];
