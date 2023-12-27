import {ProcessedConfig} from "../../../components/calculate/domain/CalculatorService/types/types";
import {createStore} from "../helpers/createStore";
import {processConfig} from "../../../components/calculate/domain/CalculatorService/utils/processConfig/processConfig";
import {operationsConfig} from "@calculator/common";

interface InitialStoreInterface {
    processedConfig: ProcessedConfig;
}

export const configStore = createStore<InitialStoreInterface>({
    processedConfig: processConfig(operationsConfig)
});