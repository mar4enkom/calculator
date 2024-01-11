import z from "zod";

export function optionalNumberWithRefine(fieldName: string) {
    return z.string().optional().refine((val) => !isNaN(Number(val)), {
        message: `${fieldName} must be a valid number`,
    });
}