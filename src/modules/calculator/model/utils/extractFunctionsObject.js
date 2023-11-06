import {Operations} from "../../../../../userConfig/operations/constants/operations.js";

export function extractFunctionsObject(operationQueue) {
    return operationQueue.find(el => el.operationCategory === Operations.FUNCTION).operations
}