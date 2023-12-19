import {processConfig} from "calculatorService/utils/processConfig/processConfig";
import {Types} from "@calculator/common";
import {InitialStoreInterface, Store} from "./InitialStore/Store";

interface InitStoreArgs {
    userConfig: Types;
}

export function initStore({userConfig}: InitStoreArgs) {
    Store.init<InitialStoreInterface>({
        processedConfig: processConfig(userConfig)
    });
}