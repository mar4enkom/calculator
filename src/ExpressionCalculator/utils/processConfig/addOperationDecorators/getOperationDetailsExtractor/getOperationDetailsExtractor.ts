import {OperationList} from "userConfig/operations/types";
import {
    IOperationDetails
} from "calculatorService/utils/processConfig/addOperationDecorators/getOperationDetailsExtractor/operations/types";
import {getFirstMatch} from "shared/utils/regexUtils/getFirstMatch";
import {ExtractOperationDetails, OperationDetails} from "calculatorService/types/types";

export function getOperationDetailsExtractor(operationsList: OperationList, operationDetails: IOperationDetails): ExtractOperationDetails {
    return (expression: string): OperationDetails => {
        const operationBodyRegex = operationDetails.getBodyRegex(operationsList);
        const operationSignRegex = operationDetails.getOperationSignRegex(operationsList);
        const extractOperands = operationDetails.extractOperands;

        const operationBody = getFirstMatch(operationBodyRegex, expression);
        if(operationBody == null) return undefined;
        const operatorSign = getFirstMatch(operationSignRegex, operationBody)!;
        const operands = extractOperands(operatorSign, operationBody);
        const { calculateExpression } = operationsList.find(el => el.sign === operatorSign)!;

        return {
            operationBody,
            operands,
            calculateExpression
        }
    }
}