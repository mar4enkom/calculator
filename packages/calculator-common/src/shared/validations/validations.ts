import z from "zod";
import {optionalNumberWithRefine} from "./utils";
import {NonEmptyArray} from "../../types/common/typeUtils";

export const getPaginationValidator = (sortByFields: NonEmptyArray<any>) => {
    return z.object({
        sortBy: z.enum(sortByFields).optional(),
        pageNumber: optionalNumberWithRefine("pageNumber"),
        limit: optionalNumberWithRefine("limit"),
    })
}