import {CalculateExpressionFunction, OperationCategoryName, OperationList} from "@calculator/common";

export type OperationDetailsType = {
    operationBody: string;
    operands: string[];
    calculateExpression: CalculateExpressionFunction;
} | undefined;

export type ProcessedConfigOperation = {
    categoryName: OperationCategoryName;
    operations: OperationList;
}

export type ExtractOperationDetails = (expr: string) => OperationDetailsType;

export type ProcessedOperationPriorityLevel = {
    categoryName: OperationCategoryName;
    operations: OperationList;
    extractOperationDetails: ExtractOperationDetails;
}

export type ProcessedConfig = ProcessedOperationPriorityLevel[];