import z from "zod";
import {getSortByFields} from "../../modules/history/validations/utils";
import {optionalNumberWithRefine} from "./utils";

export const paginationValidator = z.object({
    sortBy: z.enum(getSortByFields()).optional(),
    pageNumber: optionalNumberWithRefine("pageNumber"),
    limit: optionalNumberWithRefine("limit"),
})