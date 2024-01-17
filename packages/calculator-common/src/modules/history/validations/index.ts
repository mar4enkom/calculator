import z from "zod";
import {getPaginationValidator} from "../../../shared/validations/commonValidations";
import {historySortByKeyNames} from "./utils";

export const getHistoryListPayloadBaseValidator = z.object({
    userId: z.string({required_error: "User id is required"}),
});
export const getHistoryPaginationValidator = getPaginationValidator(historySortByKeyNames);
export const getHistoryPayloadValidator =
    getHistoryListPayloadBaseValidator.merge(getHistoryPaginationValidator);

export const addHistoryItemPayloadValidator = z.object({
    expression: z.string({required_error: "Expression is required"}),
    expressionResult: z.string({required_error: "Expression result is required"}),
})