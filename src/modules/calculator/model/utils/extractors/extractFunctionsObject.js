import {Operations} from "UserConfig/constants/operations.js";

export function extractFunctionsObject(operationQueue) {
    return operationQueue.find(el => el.operationCategory === Operations.FUNCTION).operations
}