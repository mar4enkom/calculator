import {OperationProps} from "./helpers/operationDetails/constants/constants.js";
import {Interceptor} from "../../Interceptor.js";
import {OperationValidationsSelector} from "../OperationValidationSelector/OperationValidationsSelector.js";
import {getValidationErrors} from "Shared/utils/getValidationErrors.js";
import {CalculationError} from "../../CalculationError.js";
import {OperationDetailsFactory} from "./helpers/operationDetails/OperationDetailsFactory.js";
import {OperationDetailsExtractor} from "./helpers/operationDetails/OperationDetailsExtractor.js";

export class OperationsDecorator {
    static addDecorators(operationCategories) {
        return operationCategories.map(this.addOperationCategoryDecorators.bind(this));
    }

    static addOperationCategoryDecorators(item) {
        const [categoryName, operationList] = item;
        const operationsWithValidation = this.addCalculationValidation(operationList);

        const operationDetails = OperationDetailsFactory.getOperationDetails(categoryName);
        const extractOperationDetails = OperationDetailsExtractor.getOperationDetailsExtractor(operationsWithValidation, operationDetails);

        return {
            categoryName,
            operations: operationsWithValidation,
            extractOperationDetails
        }
    }

    static addCalculationValidation(operationList) {
        return operationList.map((operationProps) => {
            const interceptor = new Interceptor();

            interceptor.add((...args) => {
                const validationSelector = new OperationValidationsSelector(operationProps);
                const validationFuncList = validationSelector.getOperationValidations();
                const errors = getValidationErrors(args, ...validationFuncList);
                if(errors.length > 0) throw new CalculationError(errors);
            });

            return {
                ...operationProps,
                calculateExpression: interceptor.applyInterceptor(operationProps.calculateExpression)
            }
        });
    }
}