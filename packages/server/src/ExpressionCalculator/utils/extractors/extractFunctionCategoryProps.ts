import {ProcessedConfig} from "calculatorService/types/types";

export function extractFunctionCategoryProps(operationCategories: ProcessedConfig) {
    return operationCategories.find(el => el.categoryName === "function")!.operations
}