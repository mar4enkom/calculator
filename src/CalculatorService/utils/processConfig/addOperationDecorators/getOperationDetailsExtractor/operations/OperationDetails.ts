import {OperationList} from "userConfig/operations/types";
import {ExtractOperationDetails, OperationDetailsType} from "calculatorService/types/types";
import {getFirstMatch} from "shared/utils/regexUtils/getFirstMatch";

export abstract class OperationDetails {
    protected abstract getBodyRegex(a: OperationList): RegExp;
    protected abstract getOperationSignRegex(a: OperationList): RegExp;
    protected abstract extractOperands(sign: string, expression: string): string[];

    getOperationDetails(operationsList: OperationList): ExtractOperationDetails {
        return (expression: string): OperationDetailsType => {
            const operationBodyRegex = this.getBodyRegex(operationsList);
            const operationSignRegex = this.getOperationSignRegex(operationsList);

            const operationBody = getFirstMatch(operationBodyRegex, expression);
            if(operationBody == null) return undefined;
            const operatorSign = getFirstMatch(operationSignRegex, operationBody)!;
            const operands = this.extractOperands(operatorSign, operationBody);
            const { calculateExpression } = operationsList.find(el => el.sign === operatorSign)!;

            return {
                operationBody,
                operands,
                calculateExpression
            }
        }
    }
}