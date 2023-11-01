import {Operations} from "../../../../../userConfig/operations/constants.js";
import {InsertionModes} from "../OperationButton.js";

export const getOperationsRenderInfo = (operationCategory) => {
    let operationInfo;
    switch (operationCategory) {
        case Operations.FUNCTION:
            operationInfo = {
                renderRootId: "functions-buttons-wrapper",
                insertionMode: InsertionModes.TEXT_WITH_PARENTHESES
            };
            break;
        case Operations.SIGN:
        case Operations.CONSTANT:
            operationInfo = {
                renderRootId: "functions-buttons-wrapper",
                insertionMode: InsertionModes.TEXT
            }
            break;
        case Operations.OPERATOR_LOW_PRIORITY:
        case Operations.OPERATOR_HIGH_PRIORITY:
            operationInfo = {
                renderRootId: "operations-buttons-wrapper",
                insertionMode: InsertionModes.TEXT
            }
            break;
        default:
            throw new Error("No such an operation");
    }
    return operationInfo;
}