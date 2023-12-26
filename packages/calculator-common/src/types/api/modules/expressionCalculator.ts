import {ApiSuccessResponse} from "../common";

export type CalculationResult = string | null;
export interface CalculationSuccessResponse extends ApiSuccessResponse<CalculationResult> {}

export type CalculateExpressionPayload = {
    expression: string;
};