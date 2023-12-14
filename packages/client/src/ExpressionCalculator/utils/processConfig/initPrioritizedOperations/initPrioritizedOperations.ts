import {Operation, OperationCategoryName, OperationList, UserConfig} from "@calculator/common";

export type PrioritizedOperation = [OperationCategoryName, Operation[]];
export type PrioritizedOperationList = PrioritizedOperation[];

export function initPrioritizedOperations(initialConfig: UserConfig): [OperationCategoryName, Operation[]][] {
    const prioritizedOperations: PrioritizedOperationList = [];
    const sortedCategoryNames = getCategoryNamesByOperationCategoryPriority(initialConfig);

    for (const categoryName of sortedCategoryNames) {
        const operations = initialConfig[categoryName];
        const prioritizedCategoryOperations = getCategoryOperationsPriorityQueue(operations);
        const adaptedQueue: PrioritizedOperationList = prioritizedCategoryOperations
            .map(queueItem => [categoryName, queueItem]);
        prioritizedOperations.push(...adaptedQueue);
    }

    return prioritizedOperations;
}

function getCategoryNamesByOperationCategoryPriority(initialConfig: UserConfig): Array<keyof UserConfig> {
    const operationCategoryNames = Object.keys(initialConfig) as Array<keyof UserConfig>;
    //operationCategoryNames.sort((a, b) => initialConfig[a].priority - initialConfig[b].priority);
    return operationCategoryNames;
}

function getCategoryOperationsPriorityQueue(operationCategory: OperationList): Operation[][] {
    const operationCategoryQueue = [];
    operationCategory.sort((a: Operation, b: Operation) => (a?.priority || 0) - (b?.priority || 0));
    let samePriorityOperations = [];
    let maxPriority = operationCategory[0]?.priority ?? 0;

    for (const operation of operationCategory) {
        if (operation.priority == null || operation.priority === maxPriority) {
            samePriorityOperations.push(operation);
        } else if (operation.priority > maxPriority) {
            operationCategoryQueue.push(samePriorityOperations);
            maxPriority = operation.priority;
            samePriorityOperations = [];
            samePriorityOperations.push(operation);
        }
    }
    operationCategoryQueue.push(samePriorityOperations);
    return operationCategoryQueue;
}