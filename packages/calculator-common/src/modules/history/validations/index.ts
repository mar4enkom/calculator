import z from "zod";
import {getPaginationValidator} from "../../../shared/validations/commonValidations";
import {historySortByKeyNames} from "./utils";

export const getHistoryListPayloadBaseValidator = z.object({});
export const getHistoryPaginationValidator = getPaginationValidator(historySortByKeyNames);
export const getHistoryPayloadValidator =
    getHistoryListPayloadBaseValidator.merge(getHistoryPaginationValidator);

export const addHistoryItemPayloadValidator = z.object({
    expression: z.string({required_error: "expression is required"}),
    expressionResult: z.string({required_error: "expressionResult result is required"}),
})