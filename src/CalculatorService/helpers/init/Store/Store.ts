import {ValueOf} from "shared/types/typesUtils";
import {DefaultStore, StoreInterface} from "calculatorService/helpers/init/Store/types";

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