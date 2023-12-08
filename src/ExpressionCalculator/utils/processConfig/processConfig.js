import {initPrioritizedOperations} from "CalculatorService/utils/processConfig/initPrioritizedOperations/initPrioritizedOperations.js";
import {addOperationDecorators} from "CalculatorService/utils/processConfig/addOperationDecorators/addOperationDecorators.js";

export function processConfig(initialConfig) {
    if(!initialConfig) throw new Error("No config was passed");

    const prioritizedOperations = initPrioritizedOperations(initialConfig);
    return addOperationDecorators(prioritizedOperations);
}