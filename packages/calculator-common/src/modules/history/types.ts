import z from "zod";
import {getHistoryListPayloadBaseValidator} from "./validations";

export type HistoryItem = {
    id: string;
    expression: string;
    expressionResult: string;
    calculationDate: Date;
}

export type GetHistoryListBasePayload = z.infer<typeof getHistoryListPayloadBaseValidator>;

export type CalculationHistory = HistoryItem[];