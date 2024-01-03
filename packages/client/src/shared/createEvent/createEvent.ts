import {ObservableVariable} from "./ObservableVariable";

export function createEvent<T, P extends Array<any>>(
    observableVar: ObservableVariable<T>,
    getNewValue: (...args: P) => T
) {
    return (...payload: P) => {
        const newValue = getNewValue(...payload);
        observableVar.setValue(newValue);
    }
}