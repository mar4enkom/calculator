import {CalculationHistory} from "./types";
import {ApiSuccessResponse} from "../../types/api/common";
import z from "zod";
import {historyPayloadValidator} from "./validations";

export type CalculationHistoryPayload = z.infer<typeof historyPayloadValidator>;

export type CalculationHistorySuccessResponse = ApiSuccessResponse<CalculationHistory>;

