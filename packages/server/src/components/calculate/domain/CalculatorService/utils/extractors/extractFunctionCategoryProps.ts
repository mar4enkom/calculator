import {OperationCategoryNames} from "@calculator/common";
import {ProcessedConfig} from "@/calculate/domain/CalculatorService/types/types";

export function extractFunctionCategoryProps(operationCategories: ProcessedConfig) {
    return operationCategories.find((el) => el.categoryName === OperationCategoryNames.FUNCTION)!.operations
}