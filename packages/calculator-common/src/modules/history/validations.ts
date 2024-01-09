import z from "zod";

export const historyPayloadValidator = z.object({
    userId: z.string(),
});