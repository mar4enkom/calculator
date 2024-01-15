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

    set(value: T): void {
        this.storage = value;
    }
}