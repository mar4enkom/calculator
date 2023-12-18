import {ValueOf} from "shared/types/typesUtils";

export class InitialStore<Store extends Record<string, any>> {
    storage: Store;

    constructor(initialData: Store) {
        this.storage = initialData;
    }

    setItem(key: keyof Store, value: ValueOf<Store>): void {
        this.storage[key] = value;
    }

    removeItem(key: keyof Store): void {
        delete this.storage[key];
    }
}