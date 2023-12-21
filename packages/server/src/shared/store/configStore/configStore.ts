import {ProcessedConfig} from "../../../calculateExpression/CalculatorService/types/types";
import {createStore} from "../helpers/createStore";
import {processConfig} from "../../../calculateExpression/CalculatorService/utils/processConfig/processConfig";
import {operationsConfig} from "@calculator/common";

interface InitialStoreInterface {
    processedConfig: ProcessedConfig;
}

export const configStore = createStore<InitialStoreInterface>({
    processedConfig: processConfig(operationsConfig)
});