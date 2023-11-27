import {Operations} from "UserConfig/constants/operations.js";
import {FunctionDetails} from "../operationDetails/FunctionDetails.js";
import {ConstantDetails} from "../operationDetails/ConstantDetails.js";
import {SignDetails} from "../operationDetails/SignDetails.js";
import {OperatorDetails} from "../operationDetails/OperatorDetails.js";

export class OperationDetailsFactory {
    static createOperationDetails(operationType) {
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
}