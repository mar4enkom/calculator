import {operationHelpers} from "./operations/index.js";
import {OperationProps} from "./operations/constants/constants.js";
import {Interceptor} from "../../Interceptor.js";
import {OperationValidationsProvider} from "../OperationValidationsProvider.js";
import {getValidationErrors} from "../../../../shared/utils/getValidationErrors.js";
import {CalculationError} from "../../CalculationError.js";

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
        const operations = this.#applyCalculationValidation(operationsList);

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

    #applyCalculationValidation(operationsList) {
        return operationsList.map((operationProps) => {
            const interceptor = new Interceptor();

            interceptor.add((...args) => {
                const validationsProvider = new OperationValidationsProvider(operationProps);
                const validationsList = validationsProvider.get();
                const errors = getValidationErrors(args, ...validationsList);
                if(errors.length > 0) throw new CalculationError(errors);
            });

            return {
                ...operationProps,
                calculateExpression: interceptor.apply(operationProps.calculateExpression)
            }
        });
    }
}