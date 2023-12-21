import {Interceptor} from "../../../helpers/Interceptor";
import {getOperationValidationList} from "./getOperationValidationList/getOperationValidationList";
import {getOperationDetails} from "./getOperationDetailsExtractor/operations/getOperationDetails";
import {
    PrioritizedOperation,
    PrioritizedOperationList
} from "../initPrioritizedOperations/initPrioritizedOperations";
import {ProcessedOperationPriorityLevel} from "../../../types/types";
import {CalculateExpressionFunction, getValidationErrors, OperationList} from "@calculator/common";
import {CustomError} from "../../../helpers/CustomError";
import {OperationErrorCodes} from "../../../constants/errorCodes";

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
            if(errors.length > 0) throw new CustomError(errors);
        });

        return {
            ...operationProps,
            calculateExpression: interceptor.applyInterceptor(operationProps.calculateExpression)
        }
    });
}