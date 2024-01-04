import {SingleObserverObservable} from "./SingleObserverObservable";

export class AppEvent<T> extends SingleObserverObservable<T>{
    constructor() {
        super();
    }

    dispatch(payload: T) {
        this.notify(payload);
    }
}