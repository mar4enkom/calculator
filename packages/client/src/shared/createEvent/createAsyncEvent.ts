import {ObservableVariable} from "./ObservableVariable";

export function createAsyncEvent<T, P extends Array<any>>(
    observableVar: ObservableVariable<T>,
    getNewValue: (...args: P) => Promise<T>
) {
    return async (...payload: P) => {
        const newValue = await getNewValue(...payload);
        observableVar.setValue(newValue);
    }
}