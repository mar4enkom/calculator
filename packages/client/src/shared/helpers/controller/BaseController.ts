import {BaseVariables, beforeRequest} from "@/shared/utils/beforeRequest";
import {AsyncEventFunction} from "@/shared/apiRouter/types";
import {handleUnknownError} from "@/shared/utils/handleUnknownError";

export type HandleFetchEventProps<VarValue, Response> = {
    transformAfter?(valueBefore: Response): VarValue;
    after?(response: Response, varValue: VarValue): void;
}
export abstract class BaseController<T> {
    constructor(
        private variables: BaseVariables<T>
    ) { }
    protected async handleAsyncEvent<Payload, Response>(asyncCallback: AsyncEventFunction<Response>, payload?: Payload, props?: HandleFetchEventProps<T, Response>) {
        try {
            beforeRequest(this.variables);

            const response = await asyncCallback(payload);

            // TODO: research how to avoid type casting (if transformAfter is undefined, VarValue should be equal to Response)
            const newValue = (props?.transformAfter?.(response) ?? response) as T;

            props?.after?.(response, newValue);
            this.variables.value.setValue(newValue);
        } catch (e) {
            const error = handleUnknownError(e);
            this.variables.error.setValue(error)
        } finally {
            this.variables.loading.setValue(false);
        }
    }
}