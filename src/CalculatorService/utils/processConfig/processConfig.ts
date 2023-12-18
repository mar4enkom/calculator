import {initPrioritizedOperations} from "calculatorService/utils/processConfig/initPrioritizedOperations/initPrioritizedOperations";
import {addOperationDecorators} from "calculatorService/utils/processConfig/addOperationDecorators/addOperationDecorators";
import {UserConfig} from "userConfig/operations/types";

export function processConfig(initialConfig: UserConfig) {
    if(!initialConfig) throw new Error("No config was passed");

    const prioritizedOperations = initPrioritizedOperations(initialConfig);
    return addOperationDecorators(prioritizedOperations);
}