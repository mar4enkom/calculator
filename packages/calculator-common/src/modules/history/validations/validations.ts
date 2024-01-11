import z from "zod";
import {paginationValidator} from "../../../shared/validations/validations";

export const historyActionPayloadValidator = z.object({
    userId: z.string({required_error: "User id is required"}),
});

export const historyPayloadValidator =
    historyActionPayloadValidator.merge(paginationValidator);