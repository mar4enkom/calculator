import {ValueOf} from "@calculator/common";

export type DefaultStore = Record<string, any>;

export interface StoreInterface<Store extends DefaultStore> {
    get(): Store;
    set(key: keyof Store, value: ValueOf<Store>): void
}
