import {CalculationHistory, HistoryItem} from "./types";
import {ApiSuccessResponse} from "../../types/api/common";
import z from "zod";
import {addHistoryItemPayloadValidator, getHistoryPayloadValidator} from "./validations";

export type GetHistoryListPayload = z.infer<typeof getHistoryPayloadValidator>;
export type GetHistoryListSuccessResponse = ApiSuccessResponse<CalculationHistory>;

export type AddHistoryRecordPayload = z.infer<typeof addHistoryItemPayloadValidator>;
export type AddHistoryRecordSuccessResponse = ApiSuccessResponse<HistoryItem>;
