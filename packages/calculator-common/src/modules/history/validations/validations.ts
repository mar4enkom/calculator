import z from "zod";
import {getPaginationValidator} from "../../../shared/validations/commonValidations";
import {getSortByFields} from "./utils";

export const historyActionPayloadValidator = z.object({
    userId: z.string({required_error: "User id is required"}),
});

const paginationValidator = getPaginationValidator(getSortByFields());

export const historyPayloadValidator =
    historyActionPayloadValidator.merge(paginationValidator);