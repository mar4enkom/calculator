import {OperationCategoryName} from "userConfig/constants/operationCategoryName";
import {CalculateExpressionFunction, OperationList} from "userConfig/operations/types";

export type OperationDetails = {
    operationBody: string;
    operands: string[];
    calculateExpression: CalculateExpressionFunction;
} | undefined;

export type ProcessedConfigOperation = {
    categoryName: OperationCategoryName;
    operations: OperationList;
}

export type ExtractOperationDetails = (expr: string) => OperationDetails;

export type ProcessedOperationPriorityLevel = {
    categoryName: OperationCategoryName;
    operations: OperationList;
    extractOperationDetails: ExtractOperationDetails;
}

export type ProcessedConfig = ProcessedOperationPriorityLevel[];