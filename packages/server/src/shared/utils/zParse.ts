import {AnyZodObject, z} from "zod";
import {MultiError} from "../errors/MultiError";

export function zParse<T extends AnyZodObject>(
    schema: T,
    dataToValidate: z.infer<T>,
): z.infer<T> {
    const validationResult = schema.safeParse(dataToValidate);

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