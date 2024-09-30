import {ApiSuccessResponse} from "../../types/api/common";
import {CalculationResult} from "./types";
import z from "zod";
import {calculateExpressionValidation} from "./validations";
import {HistoryItem} from "../history/types";

export type CalculationResponseBody = {
    calculationResult: CalculationResult;
    newRecord?: HistoryItem;
}
export interface CalculationSuccessResponse extends ApiSuccessResponse<CalculationResponseBody> {}

export type CalculateExpressionPayload = z.infer<typeof calculateExpressionValidation>;