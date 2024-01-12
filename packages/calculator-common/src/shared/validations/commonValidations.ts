import z from "zod";
import {NonEmptyArray} from "../../types/common/typeUtils";

export function getPaginationValidator<T extends string>(sortByFields: NonEmptyArray<T>) {
    return z.object({
        sortBy: z.enum(sortByFields).optional(),
        pageNumber: z.number().optional(),
        limit: z.number().optional(),
    })
}