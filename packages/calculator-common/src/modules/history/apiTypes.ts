import {CalculationHistory} from "./types";
import {ApiSuccessResponse} from "../../types/api/common";
import z from "zod";
import {historyPayloadValidator} from "./validations";

export type GetHistoryListPayload = z.infer<typeof historyPayloadValidator>;

export type GetHistoryListSuccessResponse = ApiSuccessResponse<CalculationHistory>;
