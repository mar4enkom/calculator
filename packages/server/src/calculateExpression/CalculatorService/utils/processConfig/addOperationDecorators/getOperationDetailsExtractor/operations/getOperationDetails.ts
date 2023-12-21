import {
    OperationDetails
} from "./OperationDetails";
import {
    ConstantDetails
} from "./ConstantDetails";
import {
    SignDetails
} from "./SignDetails";
import {
    OperatorDetails
} from "./OperatorDetails";
import {
    FunctionDetails
} from "./FunctionDetails";
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