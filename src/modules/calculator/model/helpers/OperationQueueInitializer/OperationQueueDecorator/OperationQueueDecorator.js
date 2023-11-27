import {OperationProps} from "./operationDetails/constants/constants.js";
import {Interceptor} from "../../Interceptor.js";
import {OperationValidationsProvider} from "../OperationValidationsProvider.js";
import {getValidationErrors} from "../../../../shared/utils/getValidationErrors.js";
import {CalculationError} from "../../CalculationError.js";
import {OperationDetailsFactory} from "./helpers/OperationDetailsFactory.js";
import {OperationDetailsExtractor} from "./helpers/OperationDetailsExtractor.js";

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
        const operations = this.#applyCalculationValidation(operationsList);

        const operationDetails = OperationDetailsFactory.createOperationDetails(operationCategory);
        const extractOperationDetails = OperationDetailsExtractor.getOperationDetailsExtractor(operations, operationDetails);

        return {
            operationCategory,
            operations,
            extractOperationDetails
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