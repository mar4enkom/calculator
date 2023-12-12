type Observer = (...args: any) => any;
export class Observable<Events extends string = string> {
    private observers: Partial<Record<Events, Observer[]>>;
    constructor() {
        this.observers = {};
    }

    subscribe(type: Events, newObserver: Observer): void {
        this.observers = {
            ...this.observers,
            [type]: [
                ...this.observers[type] || [],
                newObserver
            ]
        };
    }
    // issue: make
    unsubscribe(type: Events, newObserver: Observer): void {
        if(this.observers[type] != null) {
            this.observers = {
                ...this.observers,
                [type]: this.observers[type]!.filter(subscriber => subscriber !== newObserver)
            };
        }
    }

    notify(type: Events, data: any): void {
        this.observers[type]?.forEach(observer => observer(data));
    }
}
