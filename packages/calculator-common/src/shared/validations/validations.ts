import z from "zod";
import {NonEmptyArray} from "../../types/common/typeUtils";

export const getPaginationValidator = (sortByFields: NonEmptyArray<any>) => {
    return z.object({
        sortBy: z.enum(sortByFields).optional(),
        pageNumber: z.number().optional(),
        limit: z.number().optional(),
    })
}