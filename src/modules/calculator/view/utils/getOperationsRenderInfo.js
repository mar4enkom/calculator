import {Operations} from "../../../../constants/operations.js";
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
        case Operations.OPERATOR:
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