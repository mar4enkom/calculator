import {InitialStore} from "calculatorService/helpers/init/InitialStore/InitialStore";
import {ProcessedConfig} from "calculatorService/types/types";
import {processConfig} from "calculatorService/utils/processConfig/processConfig";
import {operationsConfig} from "userConfig/index";

interface InitialStoreInterface {
    processedConfig: ProcessedConfig;
}

const storeInstance = new InitialStore<InitialStoreInterface>({
    processedConfig: processConfig(operationsConfig)
});

export const store = storeInstance.storage;