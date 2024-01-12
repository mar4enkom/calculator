import z from "zod";
import {historyActionPayloadValidator} from "./validations/validations";

export type CalculationHistoryItem = {
    id: string;
    expression: string;
    expressionResult: string;
    calculationDate: Date;
}

export type GetHistoryActionPayload = z.infer<typeof historyActionPayloadValidator>;

export type CalculationHistory = CalculationHistoryItem[];