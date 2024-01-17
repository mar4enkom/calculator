import {
    PrioritizedOperation,
    PrioritizedOperationList
} from "@/calculate/domain/CalculatorService/utils/processConfig/initPrioritizedOperations/initPrioritizedOperations";
import {ProcessedOperationPriorityLevel} from "@/calculate/domain/CalculatorService/types/types";
import {
    getOperationDetails
} from "@/calculate/domain/CalculatorService/utils/processConfig/addOperationDecorators/getOperationDetailsExtractor/operations/getOperationDetails";
import {CalculateExpressionFunction, getValidationErrors, OperationList} from "@calculator/common";
import {Interceptor} from "@/calculate/domain/CalculatorService/helpers/Interceptor";
import {
    getOperationValidationList
} from "@/calculate/domain/CalculatorService/utils/processConfig/addOperationDecorators/getOperationValidationList/getOperationValidationList";
import {OperationErrorCodes} from "@/calculate/domain/CalculatorService/constants/errorCodes";
import {CustomError} from "@/calculate/domain/CalculatorService/helpers/CustomError";


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
            const errors = getValidationErrors<OperationErrorCodes>(args, ...validationFuncList);
            if(errors) throw new CustomError(errors);
        });

        return {
            ...operationProps,
            calculateExpression: interceptor.applyInterceptor(operationProps.calculateExpression)
        }
    });
}