type Observer = Record<string, any>;
export class Observable<Events extends Observer> {
    private observers: { [K in keyof Events]?: ((a: Events[K]) => void)[] };
    constructor() {
        this.observers = {};
    }

    subscribe<T extends keyof Events>(type: T, newObserver: (a: Events[T]) => void): void {
        this.observers = {
            ...this.observers,
            [type]: [
                ...this.observers[type] || [],
                newObserver
            ]
        };
    }

    unsubscribe<T extends keyof Events>(type: T, newObserver: (a: Events[T]) => void): void {
        if (type in this.observers && Array.isArray(this.observers[type])) {
            this.observers = {
                ...this.observers,
                [type]: this.observers[type]!.filter(subscriber => subscriber !== newObserver)
            };
        }
    }


    notify<T extends keyof Events>(type: T, data: Events[T]): void {
        this.observers[type]?.forEach(observer => observer(data));
    }
}
