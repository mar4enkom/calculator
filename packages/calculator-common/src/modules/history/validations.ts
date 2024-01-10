import z from "zod";
import {CalculationHistoryItem} from "./types";

function optionalNumberWithRefine(fieldName: string) {
    return z.string().optional().refine((val) => !isNaN(Number(val)), {
        message: `${fieldName} must be a valid number`,
    });
}

function getSortByFields(): [keyof CalculationHistoryItem, ...Array<keyof CalculationHistoryItem>] {
    const sortByPossibleValues: Record<keyof CalculationHistoryItem, undefined> = {
        id: undefined,
        expression: undefined,
        expressionResult: undefined,
        date: undefined
    }
    return Object.keys(sortByPossibleValues) as [keyof CalculationHistoryItem, ...Array<keyof CalculationHistoryItem>];
}

export const paginationValidator = z.object({
    sortBy: z.enum(getSortByFields()).optional(),
    pageNumber: optionalNumberWithRefine("pageNumber"),
    limit: optionalNumberWithRefine("limit"),
})

export const historyPayloadParamsValidator = z.object({
    userId: z.string({required_error: "User id is required"}),
});

export const historyPayloadValidator = paginationValidator.merge(historyPayloadParamsValidator);