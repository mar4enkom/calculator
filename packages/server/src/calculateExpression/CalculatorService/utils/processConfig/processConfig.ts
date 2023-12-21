import {initPrioritizedOperations} from "./initPrioritizedOperations/initPrioritizedOperations";
import {addOperationDecorators} from "./addOperationDecorators/addOperationDecorators";
import {UserConfig} from "@calculator/common";

export function processConfig(initialConfig: UserConfig) {
    if(!initialConfig) throw new Error("No config was passed");

    const prioritizedOperations = initPrioritizedOperations(initialConfig);
    return addOperationDecorators(prioritizedOperations);
}