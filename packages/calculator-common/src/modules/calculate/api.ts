import {ApiSuccessResponse} from "../../types/api/common";
import {CalculationResult} from "./types";
import z from "zod";
import {calculateExpressionValidation} from "./validations";

export interface CalculationSuccessResponse extends ApiSuccessResponse<CalculationResult> {}

export type CalculateExpressionPayload = z.infer<typeof calculateExpressionValidation>;