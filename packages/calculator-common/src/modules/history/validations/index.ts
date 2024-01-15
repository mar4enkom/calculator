import z from "zod";
import {getPaginationValidator} from "../../../shared/validations/commonValidations";
import {historySortByKeyNames} from "./utils";

export const getHistoryListPayloadBaseValidator = z.object({
    userId: z.string({required_error: "User id is required"}),
});

const paginationValidator = getPaginationValidator(historySortByKeyNames);

export const getHistoryPayloadValidator =
    getHistoryListPayloadBaseValidator.merge(paginationValidator);

export const addHistoryItemPayloadValidator = z.object({
    expression: z.string({required_error: "Expression is required"}),
    expressionResult: z.string({required_error: "Expression result is required"}),
})