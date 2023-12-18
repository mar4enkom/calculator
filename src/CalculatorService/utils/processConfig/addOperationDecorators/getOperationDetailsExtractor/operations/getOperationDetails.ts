import {
    OperatorDetails
} from "calculatorService/utils/processConfig/addOperationDecorators/getOperationDetailsExtractor/operations/OperatorDetails";
import {
    FunctionDetails
} from "calculatorService/utils/processConfig/addOperationDecorators/getOperationDetailsExtractor/operations/FunctionDetails";
import {
    SignDetails
} from "calculatorService/utils/processConfig/addOperationDecorators/getOperationDetailsExtractor/operations/SignDetails";
import {OperationCategoryName} from "userConfig/constants/operationCategoryName";
import {
    ConstantDetails
} from "calculatorService/utils/processConfig/addOperationDecorators/getOperationDetailsExtractor/operations/ConstantDetails";
import {
    OperationDetails
} from "calculatorService/utils/processConfig/addOperationDecorators/getOperationDetailsExtractor/operations/OperationDetails";

declare function assert(value: never): never;

export function getOperationDetails(operationType: OperationCategoryName): OperationDetails {
    let operationDetails;

    switch (operationType) {
        case OperationCategoryName.CONSTANT:
            operationDetails = new ConstantDetails();
            break;
        case OperationCategoryName.SIGN:
            operationDetails = new SignDetails();
            break;
        case OperationCategoryName.OPERATOR:
            operationDetails = new OperatorDetails();
            break;
        case OperationCategoryName.FUNCTION:
            operationDetails = new FunctionDetails();
            break;
        default: {
            assert(operationType);
        }
    }
    return operationDetails;
}