import {StoreInterface} from "./types";
import {ValueOf} from "@calculator/common";

export class Store<T extends Object> implements StoreInterface<T> {
    private storage: T;

    constructor(initialData: T) {
        this.storage = initialData;
    }

    get(): T {
        return this.storage;
    }

    set(key: keyof T, value: ValueOf<T>): void {
        this.storage[key] = value;
    }
}