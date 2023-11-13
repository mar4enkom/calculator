import {operationHelpers} from "./operations/index.js";
import {OperationProps} from "./operations/constants/constants.js";
import {OperationValidator} from "../OperationValidator.js";

export class OperationQueueDecorator {
    static instance;

    static getInstance() {
        if(!OperationQueueDecorator.instance) {
            OperationQueueDecorator.instance = new OperationQueueDecorator();
        }
        return OperationQueueDecorator.instance;
    }

    applyDecorators(operationsQueue) {
        return operationsQueue.map(this.#applyQueueItemDecorators.bind(this));
    }

    #applyQueueItemDecorators(item) {
        const [operationCategory, operationsList] = item;
        const operationsRegexes = this.#getOperationsRegex(operationCategory, operationsList);
        const operations = this.#applyValidationInterceptor(operationsList);

        return { operationCategory, operations, ...operationsRegexes };
    }

    #getOperationsRegex(operationCategory, operationsList) {
        const operationHelper = operationHelpers[operationCategory];
        const operationBodyRegex = operationHelper[OperationProps.BODY_REGEX](operationsList);
        const operationSignRegex = operationHelper[OperationProps.OPERATION_SIGN_REGEX](operationsList);
        const extractOperands = operationHelper[OperationProps.EXTRACT_OPERANDS];

        return {
            operationBodyRegex,
            operationSignRegex,
            extractOperands,
        }
    }

    #applyValidationInterceptor(operationsList) {
        const operationValidator = OperationValidator.getInstance();

        return operationsList.map((operationProps) =>
            operationValidator.withValidatedCalc(operationProps));
    }
}