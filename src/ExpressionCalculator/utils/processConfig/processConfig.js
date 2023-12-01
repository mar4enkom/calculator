import {initPrioritizedOperations} from "./initPrioritizedOperations/initPrioritizedOperations.js";
import {addOperationDecorators} from "./addOperationDecorators/addOperationDecorators.js";

export function processConfig(initialConfig) {
    if(!initialConfig) throw new Error("No config was passed");

    const prioritizedOperations = initPrioritizedOperations(initialConfig);
    return addOperationDecorators(prioritizedOperations);
}