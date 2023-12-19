import {processConfig} from "calculatorService/utils/processConfig/processConfig";
import {UserConfig} from "@calculator/common";
import {InitialStoreInterface, Store} from "./InitialStore/Store";

interface InitStoreArgs {
    userConfig: UserConfig;
}

export function initStore({userConfig}: InitStoreArgs) {
    Store.init<InitialStoreInterface>({
        processedConfig: processConfig(userConfig)
    });
}