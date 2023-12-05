import {getOperationDetailsExtractor} from "./getOperationDetailsExtractor/getOperationDetailsExtractor.js";
import {Interceptor} from "CalculatorService/helpers/Interceptor.js";
import {CalculationError} from "CalculatorService/helpers/CalculationError.js";
import {getValidationErrors} from "Shared/utils/getValidationErrors.js";
import {getOperationValidationList} from "./getOperationValidationList/getOperationValidationList.js";
import {getOperationDetails} from "./getOperationDetailsExtractor/operations/getOperationDetails.js";

export function addOperationDecorators(operationCategories) {
    return operationCategories.map(addOperationCategoryDecorators);
}

function addOperationCategoryDecorators(item) {
    const [categoryName, operationList] = item;
    const operationsWithValidation = addCalculationValidation(operationList);

    const operationDetails = getOperationDetails(categoryName);
    const extractOperationDetails = getOperationDetailsExtractor(operationsWithValidation, operationDetails);

    return {
        categoryName,
        operations: operationsWithValidation,
        extractOperationDetails
    }
}

function addCalculationValidation(operationList) {
    return operationList.map((operationProps) => {
        const interceptor = new Interceptor();

        interceptor.add((...args) => {
            const validationFuncList = getOperationValidationList(operationProps);
            const errors = getValidationErrors(args, ...validationFuncList);
            if(errors.length > 0) throw new CalculationError(errors);
        });

        return {
            ...operationProps,
            calculateExpression: interceptor.applyInterceptor(operationProps.calculateExpression)
        }
    });
}