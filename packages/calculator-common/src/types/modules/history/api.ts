import {CalculationHistory} from "./types";
import {ApiSuccessResponse} from "../../api/common";

export type CalculationHistoryPayload = {
    userId: string;
}

export type CalculationHistorySuccessResponse = ApiSuccessResponse<CalculationHistory>;

