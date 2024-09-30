
export interface StoreInterface<Store extends Object> {
    get(): Store;
    set(value: Store): void
}
