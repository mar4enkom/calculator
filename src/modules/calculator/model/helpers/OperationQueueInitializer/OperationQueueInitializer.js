import {Operations} from "UserConfig/constants/operations.js";
import {Regex} from "../../constants/regex.js";
import {Symbols} from "UserConfig/constants/constants.js";
import {stringIsNumber} from "../../utils/stringIsNumber.js";
import {safeRegexSymbol} from "../../utils/safetyRegexSymbol.js";
import {
    getOperationSignsRegexSource
} from "../../utils/regex/operations/getOperationSignsRegexSource.js";
import {createMemoRegex} from "../../utils/createMemoRegex.js";
import {OperationQueueDecorator} from "./OperationQueueDecorator/OperationQueueDecorator.js";
import {
    getFunctionOperationSignsRegexSource
} from "../../utils/regex/operations/getFunctionOperationSignsRegexSource.js";
import {getFunctionRegexSource} from "../../utils/regex/operations/getFunctionRegexSource.js";

export class OperationQueueInitializer {
    static instance;

    static getInstance() {
        if(!OperationQueueInitializer.instance) {
            OperationQueueInitializer.instance = new OperationQueueInitializer();
        }
        return OperationQueueInitializer.instance;
    }

    init(initialConfig) {
        if(!initialConfig) throw new Error("No config was passed");

        const operationQueue = this.#createOperationsPriorityQueue(initialConfig);
        const operationQueueDecorator = OperationQueueDecorator.getInstance();

        return operationQueueDecorator.applyDecorators(operationQueue);
    }

    #createOperationsPriorityQueue(initialConfig) {
        const operationQueue = [];
        const operationCategoryNames = Object.keys(initialConfig);
        operationCategoryNames.sort((a, b) => initialConfig[a].priority - initialConfig[b].priority);

        for (const categoryName of operationCategoryNames) {
            const operations = initialConfig[categoryName];
            operations.sort((a, b) => a.priority - b.priority);
            let samePriorityOperations = [];
            let maxPriority = operations[0]?.priority ?? 0;

            for (const operation of operations) {
                if(operation.priority == null || operation.priority === maxPriority) {
                    samePriorityOperations.push(operation);
                } else if(operation.priority > maxPriority) {
                    operationQueue.push([categoryName, samePriorityOperations]);
                    maxPriority = operation.priority;
                    samePriorityOperations = [];
                    samePriorityOperations.push(operation);
                }
            }
            operationQueue.push([categoryName, samePriorityOperations]);
        }

        return operationQueue;
    }
}