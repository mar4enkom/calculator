import {ObservableVariable} from "./ObservableVariable";

export type AsyncEvent<Params extends Array<any>> = (...payload: Params) => Promise<void>

export function createAsyncEvent<T, P extends Array<any> = []>(
    observableVar: ObservableVariable<T>,
    getNewValue: (...args: P) => Promise<T>
): AsyncEvent<P> {
    return async (...payload: P) => {
        const newValue = await getNewValue(...payload);
        observableVar.setValue(newValue);
    }
}