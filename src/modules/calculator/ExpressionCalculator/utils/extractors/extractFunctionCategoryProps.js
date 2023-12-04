import {Operations} from "@userConfig/constants/operations.js";

export function extractFunctionCategoryProps(operations) {
    return operations.find(el => el.categoryName === Operations.FUNCTION).operations
}