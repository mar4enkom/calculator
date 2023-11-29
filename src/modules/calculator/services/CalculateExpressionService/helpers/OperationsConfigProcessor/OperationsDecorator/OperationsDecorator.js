import {OperationProps} from "./helpers/operationDetails/constants/constants.js";
import {Interceptor} from "../../Interceptor.js";
import {OperationValidationsSelector} from "../OperationValidationSelector/OperationValidationsSelector.js";
import {getValidationErrors} from "../../../../../shared/utils/getValidationErrors.js";
import {CalculationError} from "../../CalculationError.js";
import {OperationDetailsFactory} from "./helpers/operationDetails/OperationDetailsFactory.js";
import {OperationDetailsExtractor} from "./helpers/operationDetails/OperationDetailsExtractor.js";

export class OperationsDecorator {
    static applyDecorators(operations) {
        return operations.map(this.applyOperationDecorators.bind(this));
    }

    static applyOperationDecorators(item) {
        const [operationCategory, operationsList] = item;
        const operationsWithValidation = this.applyCalculationValidation(operationsList);

        const operationDetails = OperationDetailsFactory.getOperationDetails(operationCategory);
        const extractOperationDetails = OperationDetailsExtractor.getOperationDetailsExtractor(operationsWithValidation, operationDetails);

        return {
            operationCategory,
            operations: operationsWithValidation,
            extractOperationDetails
        }
    }

    static applyCalculationValidation(operationsList) {
        return operationsList.map((operationProps) => {
            const interceptor = new Interceptor();

            interceptor.add((...args) => {
                const validationSelector = new OperationValidationsSelector(operationProps);
                const validationList = validationSelector.getValidations();
                const errors = getValidationErrors(args, ...validationList);
                if(errors.length > 0) throw new CalculationError(errors);
            });

            return {
                ...operationProps,
                calculateExpression: interceptor.applyInterceptor(operationProps.calculateExpression)
            }
        });
    }
}