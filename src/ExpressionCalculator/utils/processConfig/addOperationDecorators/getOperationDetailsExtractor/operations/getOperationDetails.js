import {Operations} from "UserConfig/constants/operations.js";
import {ConstantDetails} from "CalculatorService/utils/processConfig/addOperationDecorators/getOperationDetailsExtractor/operations/ConstantDetails.js";
import {OperatorDetails} from "CalculatorService/utils/processConfig/addOperationDecorators/getOperationDetailsExtractor/operations/OperatorDetails.js";
import {FunctionDetails} from "CalculatorService/utils/processConfig/addOperationDecorators/getOperationDetailsExtractor/operations/FunctionDetails.js";
import {SignDetails} from "CalculatorService/utils/processConfig/addOperationDecorators/getOperationDetailsExtractor/operations/SignDetails.js";

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