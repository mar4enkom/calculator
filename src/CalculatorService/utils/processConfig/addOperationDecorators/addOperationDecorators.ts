import {Interceptor} from "calculatorService/helpers/Interceptor";
import {getOperationValidationList} from "calculatorService/utils/processConfig/addOperationDecorators/getOperationValidationList/getOperationValidationList";
import {getOperationDetails} from "calculatorService/utils/processConfig/addOperationDecorators/getOperationDetailsExtractor/operations/getOperationDetails";
import {
    PrioritizedOperation,
    PrioritizedOperationList
} from "calculatorService/utils/processConfig/initPrioritizedOperations/initPrioritizedOperations";
import {CalculateExpressionFunction, OperationList} from "userConfig/operations/types";
import {ProcessedOperationPriorityLevel} from "calculatorService/types/types";
import {getValidationErrors} from "shared/utils/getValidationErrors";
import {CustomError} from "calculatorService/helpers/CustomError";
import {OperationErrorCode} from "calculatorService/constants/errorCodes";

export function addOperationDecorators(operationCategories: PrioritizedOperationList) {
    return operationCategories.map(addOperationCategoryDecorators);
}

function addOperationCategoryDecorators(prioritizedOperation: PrioritizedOperation): ProcessedOperationPriorityLevel {
    const [categoryName, operationList] = prioritizedOperation;
    const operationsWithValidation = addCalculationValidation(operationList);

    const operationDetails = getOperationDetails(categoryName);
    const extractOperationDetails = operationDetails.getOperationDetails(operationsWithValidation);

    return {
        categoryName,
        operations: operationsWithValidation,
        extractOperationDetails
    }
}

function addCalculationValidation(operationList: OperationList): OperationList {
    return operationList.map((operationProps) => {
        const interceptor = new Interceptor<CalculateExpressionFunction>();

        interceptor.add((...args) => {
            const validationFuncList = getOperationValidationList(operationProps);
            const errors = getValidationErrors<OperationErrorCode>(args, ...validationFuncList);
            if(errors.length > 0) throw new CustomError(errors);
        });

        return {
            ...operationProps,
            calculateExpression: interceptor.applyInterceptor(operationProps.calculateExpression)
        }
    });
}