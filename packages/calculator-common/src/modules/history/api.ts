import {CalculationHistory} from "./types";
import {ApiSuccessResponse} from "../../types/api/common";

export type CalculationHistoryPayload = {
    userId: string;
}

export type CalculationHistorySuccessResponse = ApiSuccessResponse<CalculationHistory>;

