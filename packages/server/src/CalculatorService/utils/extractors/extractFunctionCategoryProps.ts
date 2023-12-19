import {ProcessedConfig} from "calculatorService/types/types";
import {OperationCategoryNames} from "@calculator/common";

export function extractFunctionCategoryProps(operationCategories: ProcessedConfig) {
    return operationCategories.find((el) => el.categoryName === OperationCategoryNames.FUNCTION)!.operations
}