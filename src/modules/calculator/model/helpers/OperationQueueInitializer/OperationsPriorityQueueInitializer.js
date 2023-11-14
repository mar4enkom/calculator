export class OperationsPriorityQueueInitializer {
    static instance;

    static getInstance() {
        if(!OperationsPriorityQueueInitializer.instance) {
            OperationsPriorityQueueInitializer.instance = new OperationsPriorityQueueInitializer();
        }
        return OperationsPriorityQueueInitializer.instance;
    }

    init(initialConfig) {
        return this.#initOperationsPriorityQueue(initialConfig);
    }

    #initOperationsPriorityQueue(initialConfig) {
        const operationsPriorityQueue = [];
        const operationCategoryNames = Object.keys(initialConfig);
        operationCategoryNames.sort((a, b) => initialConfig[a].priority - initialConfig[b].priority);

        for (const categoryName of operationCategoryNames) {
            const operations = initialConfig[categoryName];
            const operationCategoryPriorityQueue = this.#getCategoryOperationsPriorityQueue(operations);
            const adaptedQueue = operationCategoryPriorityQueue
                .map(queueItem => [categoryName, queueItem]);
            operationsPriorityQueue.push(...adaptedQueue);
        }

        return operationsPriorityQueue;
    }

    #getCategoryOperationsPriorityQueue(operationCategory) {
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
}
