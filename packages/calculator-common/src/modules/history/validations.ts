import z from "zod";

export const historyPayloadValidator = z.object({
    userId: z.string({required_error: "User id is required"}),
});