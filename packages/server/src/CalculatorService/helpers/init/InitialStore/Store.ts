import {DefaultStore, StoreInterface} from "calculatorService/helpers/init/Store/types";
import {Store as BasicStore} from "calculatorService/helpers/init/Store/Store";
import {ProcessedConfig} from "calculatorService/types/types";

export interface InitialStoreInterface extends DefaultStore {
    processedConfig: ProcessedConfig;
}

export class Store {
    private static store: StoreInterface<InitialStoreInterface> | undefined;

    static getValues(){
        if(Store.store == null) throw new Error("No initialized config");
        return Store.store.get();
    }

    static init<T extends InitialStoreInterface>(initArgs: T): void {
        Store.store = new BasicStore<T>(initArgs);
    }
}