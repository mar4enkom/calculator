import {initPrioritizedOperations} from "./initPrioritizedOperations/initPrioritizedOperations";
import {addOperationDecorators} from "./addOperationDecorators/addOperationDecorators";
import {OperationsConfig} from "@calculator/common";

export function processConfig(initialConfig: OperationsConfig) {
    if(!initialConfig) throw new Error("No configStore was passed");

    const prioritizedOperations = initPrioritizedOperations(initialConfig);
    return addOperationDecorators(prioritizedOperations);
}