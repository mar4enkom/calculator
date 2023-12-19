import {
    OperationDetails
} from "calculatorService/utils/processConfig/addOperationDecorators/getOperationDetailsExtractor/operations/OperationDetails";
import {
    ConstantDetails
} from "calculatorService/utils/processConfig/addOperationDecorators/getOperationDetailsExtractor/operations/ConstantDetails";
import {
    SignDetails
} from "calculatorService/utils/processConfig/addOperationDecorators/getOperationDetailsExtractor/operations/SignDetails";
import {
    OperatorDetails
} from "calculatorService/utils/processConfig/addOperationDecorators/getOperationDetailsExtractor/operations/OperatorDetails";
import {
    FunctionDetails
} from "calculatorService/utils/processConfig/addOperationDecorators/getOperationDetailsExtractor/operations/FunctionDetails";
import {OperationCategoryNames} from "@calculator/common";

declare function assert(value: never): never;

export function getOperationDetails(operationType: OperationCategoryNames): OperationDetails {
    let operationDetails;

    switch (operationType) {
        case OperationCategoryNames.CONSTANT:
            operationDetails = new ConstantDetails();
            break;
        case OperationCategoryNames.SIGN:
            operationDetails = new SignDetails();
            break;
        case OperationCategoryNames.OPERATOR:
            operationDetails = new OperatorDetails();
            break;
        case OperationCategoryNames.FUNCTION:
            operationDetails = new FunctionDetails();
            break;
        default: {
            assert(operationType);
        }
    }
    return operationDetails;
}