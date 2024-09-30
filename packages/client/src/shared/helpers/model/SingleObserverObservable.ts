export type DefaultObservers = Record<string, any>;

type Observer<EventPayload> = Array<(a: EventPayload) => void>;

export abstract class SingleObserverObservable<EventPayload> {
    private observer: Observer<EventPayload>;
    constructor() {
        this.observer = [];
    }

    subscribe(newObserver: (a: EventPayload) => void): void {
        this.observer.push(newObserver);
    }

    notify(data: EventPayload): void {
        this.observer.forEach(observer => observer(data));
    }
}
