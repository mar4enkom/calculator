export function initPrioritizedOperations(initialConfig) {
    const operationsPriorityQueue = [];
    const sortedCategoryNames = getCategoryNamesByOperationCategoryPriority(initialConfig);

    for (const categoryName of sortedCategoryNames) {
        const operations = initialConfig[categoryName];
        const operationCategoryPriorityQueue = getCategoryOperationsPriorityQueue(operations);
        const adaptedQueue = operationCategoryPriorityQueue
            .map(queueItem => [categoryName, queueItem]);
        operationsPriorityQueue.push(...adaptedQueue);
    }

    return operationsPriorityQueue;
}

function getCategoryNamesByOperationCategoryPriority(initialConfig) {
    const operationCategoryNames = Object.keys(initialConfig);
    operationCategoryNames.sort((a, b) => initialConfig[a].priority - initialConfig[b].priority);
    return operationCategoryNames;
}

function getCategoryOperationsPriorityQueue(operationCategory) {
    const operationCategoryQueue = [];
    operationCategory.sort((a, b) => a.priority - b.priority);
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