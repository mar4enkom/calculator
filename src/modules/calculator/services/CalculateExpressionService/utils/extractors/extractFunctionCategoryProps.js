import {Operations} from "UserConfig/constants/operations.js";

export function extractFunctionCategoryProps(operations) {
    return operations.find(el => el.operationCategory === Operations.FUNCTION).operations
}