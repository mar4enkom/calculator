import {ObservableType} from "./CalculateExpressionService.js";

export class Observable {
    constructor() {
        this.observers = {};
    }

    subscribe(type, newObserver) {
        this.observers = {
            ...this.observers,
            [type]: [
                ...this.observers[type] || [],
                newObserver
            ]
        };
    }

    unsubscribe(type, newObserver) {
        this.observers = this.observers[type].filter(subscriber => subscriber !== newObserver);
    }

    notify(type, data) {
        this.observers[type]?.forEach(observer => observer(data));
    }
}
