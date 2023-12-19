import {initPrioritizedOperations} from "calculatorService/utils/processConfig/initPrioritizedOperations/initPrioritizedOperations";
import {addOperationDecorators} from "calculatorService/utils/processConfig/addOperationDecorators/addOperationDecorators";
import {Types} from "@calculator/common";

export function processConfig(initialConfig: Types) {
    if(!initialConfig) throw new Error("No config was passed");

    const prioritizedOperations = initPrioritizedOperations(initialConfig);
    return addOperationDecorators(prioritizedOperations);
}