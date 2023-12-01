import {Operations} from "UserConfig/constants/operations.js";

export function extractFunctionCategoryProps(operations) {
    return operations.find(el => el.categoryName === Operations.FUNCTION).operations
}