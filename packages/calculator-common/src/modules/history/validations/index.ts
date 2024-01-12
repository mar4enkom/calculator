import z from "zod";
import {getPaginationValidator} from "../../../shared/validations/commonValidations";
import {historySortByKeyNames} from "./utils";

export const getHistoryListPayloadBaseValidator = z.object({
    userId: z.string({required_error: "User id is required"}),
});

const paginationValidator = getPaginationValidator(historySortByKeyNames);

export const historyPayloadValidator =
    getHistoryListPayloadBaseValidator.merge(paginationValidator);