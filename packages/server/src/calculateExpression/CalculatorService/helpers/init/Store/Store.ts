import {DefaultStore, StoreInterface} from "./types";
import {ValueOf} from "@calculator/common";

export class Store<Store extends DefaultStore> implements StoreInterface<Store> {
    private storage: Store;

    constructor(initialData: Store) {
        this.storage = initialData;
    }

    get(): Store {
        return this.storage;
    }

    set(key: keyof Store, value: ValueOf<Store>): void {
        this.storage[key] = value;
    }
}