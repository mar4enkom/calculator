import z from "zod";

export const calculateExpressionValidation = z.object({
    expression: z.string()
});