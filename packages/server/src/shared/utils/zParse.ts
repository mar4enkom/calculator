import {AnyZodObject, z} from "zod";
import {MultiError} from "../errors/MultiError";
import {RestRequestQuery} from "../types/express";

export function zParse<T extends AnyZodObject>(
    schema: T,
    req: RestRequestQuery<z.infer<T>>
): z.infer<T> {
    const validationResult = schema.safeParse(req);

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