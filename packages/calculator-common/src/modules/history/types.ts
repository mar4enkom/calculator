import z from "zod";
import {getHistoryListPayloadBaseValidator} from "./validations";
import {AddHistoryRecordPayload} from "./apiTypes";

export interface HistoryItem extends AddHistoryRecordPayload {
    id: string;
    calculationDate: Date;
}

export type GetHistoryListBasePayload = z.infer<typeof getHistoryListPayloadBaseValidator>;

export type CalculationHistory = HistoryItem[];
