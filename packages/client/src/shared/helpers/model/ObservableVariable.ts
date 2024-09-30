import {SingleObserverObservable} from "./SingleObserverObservable";

type MaybeUndefined<Value> = Value | undefined;

export class ObservableVariable<T> extends SingleObserverObservable<T> {
    private _value: MaybeUndefined<T>;

    constructor(variableValue?: T) {
        super();
        this._value = variableValue;
    }

    getValue(): MaybeUndefined<T> {
        return this._value;
    }

    setValue(newValue: T): void {
        this._value = newValue;
        this.notify(newValue);
    }
}