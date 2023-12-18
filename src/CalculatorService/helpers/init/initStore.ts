import {processConfig} from "calculatorService/utils/processConfig/processConfig";
import {Store, InitialStoreInterface} from "calculatorService/helpers/init/InitialStore/Store";
import {UserConfig} from "userConfig/operations/types";

interface InitStoreArgs {
    userConfig: UserConfig;
}

export function initStore({userConfig}: InitStoreArgs) {
    Store.init<InitialStoreInterface>({
        processedConfig: processConfig(userConfig)
    });
}