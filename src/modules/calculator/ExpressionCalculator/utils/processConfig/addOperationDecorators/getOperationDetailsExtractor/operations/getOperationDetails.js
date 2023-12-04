import {Operations} from "@userConfig/constants/operations.js";
import {ConstantDetails} from "./ConstantDetails.js";
import {OperatorDetails} from "./OperatorDetails.js";
import {FunctionDetails} from "./FunctionDetails.js";
import {SignDetails} from "./SignDetails.js";

export function getOperationDetails(operationType) {
    let operationDetails;

    switch (operationType) {
        case Operations.CONSTANT:
            operationDetails = new ConstantDetails();
            break;
        case Operations.SIGN:
            operationDetails = new SignDetails();
            break;
        case Operations.OPERATOR:
            operationDetails = new OperatorDetails();
            break;
        case Operations.FUNCTION:
            operationDetails = new FunctionDetails();
            break;
        default:
            throw new Error("Invalid operation type");
    }
    return operationDetails;
}