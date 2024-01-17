import {CalculationHistory, HistoryItem} from "./types";
import {ApiSuccessResponse} from "../../types/api/common";
import z from "zod";
import {
    addHistoryItemPayloadValidator,
    getHistoryListPayloadBaseValidator,
    getHistoryPaginationValidator,
    getHistoryPayloadValidator
} from "./validations";

// type for full payload
export type GetHistoryListPayload = z.infer<typeof getHistoryPayloadValidator>;
// type for payload without pagination
export type GetHistoryBasePayload = z.infer<typeof getHistoryListPayloadBaseValidator>;
// type for pagination
export type GetHistoryPagination = z.infer<typeof getHistoryPaginationValidator>;
export type GetHistoryListSuccessResponse = ApiSuccessResponse<CalculationHistory>;

export type AddHistoryRecordPayload = z.infer<typeof addHistoryItemPayloadValidator>;
export type AddHistoryRecordSuccessResponse = ApiSuccessResponse<HistoryItem>;
