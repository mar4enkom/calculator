import {ApiSuccessResponse} from "../../api/common";
import {CalculationResult} from "./types";

export interface CalculationSuccessResponse extends ApiSuccessResponse<CalculationResult> {}

export type CalculateExpressionPayload = {
    expression: string;
};