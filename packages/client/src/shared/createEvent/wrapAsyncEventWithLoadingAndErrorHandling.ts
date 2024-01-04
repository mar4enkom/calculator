import {AsyncEvent} from "./createAsyncEvent";
import {ErrorObservableVariable, LoadingObservableVariable} from "./types";
import {handleUnknownError} from "../utils/handleUnknownError";

export function wrapAsyncEventWithLoadingAndErrorHandling<T extends Array<any>>(
    asyncEvent: AsyncEvent<T>,
    loadingVar: LoadingObservableVariable,
    errorVar: ErrorObservableVariable
): AsyncEvent<T> {
    return async (...args: T) => {
        try {
            loadingVar.setValue(true);
            await asyncEvent(...args);
        } catch (e) {
            const error = handleUnknownError(e);
            errorVar.setValue(error)
        } finally {
            loadingVar.setValue(false);
        }
    }
}