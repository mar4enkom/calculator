import {AnyZodObject, z} from "zod";
import {MultiError} from "../errors/MultiError";
import {RestRequest} from "@/shared/types/express";

export function zParse<T extends AnyZodObject>(
    schema: T,
    req: RestRequest<z.infer<T>, z.infer<T>>
): z.infer<T> {
    const validationResult = req.query != null && Object.keys(req.query).length > 0
        ? schema.safeParse(req.query)
        : schema.safeParse(req.body);

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