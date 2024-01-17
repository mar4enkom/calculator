import {Store} from "@calculator/common";

export function createStore<T extends Object>(initialStore: T): Store<T> {
    const store = new Store<T>(initialStore);

    return store;
}