import {ProcessedConfig} from "calculatorService/types/types";
import {OperationCategoryName} from "userConfig/constants/operationCategoryName";

export function extractFunctionCategoryProps(operationCategories: ProcessedConfig) {
    return operationCategories.find((el) => el.categoryName === OperationCategoryName.FUNCTION)!.operations
}