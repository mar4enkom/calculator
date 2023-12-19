import {CalculateExpressionFunction, OperationCategoryNames, OperationList} from "@calculator/common";

export type OperationDetailsType = {
    operationBody: string;
    operands: string[];
    calculateExpression: CalculateExpressionFunction;
} | undefined;

export type ProcessedConfigOperation = {
    categoryName: OperationCategoryNames;
    operations: OperationList;
}

export type ExtractOperationDetails = (expr: string) => OperationDetailsType;

export type ProcessedOperationPriorityLevel = {
    categoryName: OperationCategoryNames;
    operations: OperationList;
    extractOperationDetails: ExtractOperationDetails;
}

export type ProcessedConfig = ProcessedOperationPriorityLevel[];