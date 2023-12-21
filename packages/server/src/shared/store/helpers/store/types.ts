import {ValueOf} from "@calculator/common";

export interface StoreInterface<Store extends Object> {
    get(): Store;
    set(key: keyof Store, value: ValueOf<Store>): void
}
