import {AnyZodObject, z} from "zod";
import {MultiError} from "../errors/MultiError";
import {RestRequest} from "@/shared/types/express";
import {getRequestBody} from "@/shared/utils/getRequestBody";

export function zParse<T extends AnyZodObject>(
    schema: T,
    requestBody: z.infer<T>,
): z.infer<T> {
    const validationResult = schema.safeParse(requestBody);

    if(validationResult.success) {
        return validationResult.data
    } else {
        const adaptedErrors = validationResult.error.errors.map((errorItem) => ({
            code: errorItem.code,
            message: errorItem.message
        }));
        throw new MultiError(adaptedErrors);
    }
}