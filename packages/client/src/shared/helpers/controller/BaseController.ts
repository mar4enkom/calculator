import {BaseVariables, beforeRequest} from "@/shared/utils/beforeRequest";
import {AsyncEventFunction} from "@/shared/apiRouter/types";
import {handleUnknownError} from "@/shared/utils/handleUnknownError";
import {CustomErrorType, Maybe} from "@calculator/common";
import {AppError} from "@/shared/helpers/error/AppError";
import {ErrorCodes} from "@/shared/contstants/clientErrors";

export type HandleFetchEventProps<VarValue, Response> = {
    transformAfter?(valueBefore: Response): VarValue;
    after?(response: Response, varValue: VarValue): void;
    validateBefore?(): Maybe<CustomErrorType[]>;
}
export abstract class BaseController<T> {
    constructor(private variables: BaseVariables<T>) {}

    protected async handleAsyncEvent<Response, Payload = any>(
        asyncCallback: AsyncEventFunction<Response>,
        payload?: Payload,
        props?: HandleFetchEventProps<T, Response>
    ) {
        try {
            const validationErrors = props?.validateBefore?.();
            if(validationErrors) {
                const error = new AppError(validationErrors, ErrorCodes.VALIDATION_ERROR);
                return this.variables.error.setValue(error);
            }
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

    protected createAsyncEventHandler<Response, Payload = any>(
        asyncCallback: AsyncEventFunction<Response>,
        props?: HandleFetchEventProps<T, Response>
    ) {
        return (payload: Payload) => {
            this.handleAsyncEvent(asyncCallback, payload, props);
        }
    }
}