import {Operations} from "UserConfig/constants/operations.js";
import {FunctionDetails} from "./operations/FunctionDetails.js";
import {ConstantDetails} from "./operations/ConstantDetails.js";
import {SignDetails} from "./operations/SignDetails.js";
import {OperatorDetails} from "./operations/OperatorDetails.js";

export class OperationDetailsFactory {
    static getOperationDetails(operationType) {
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