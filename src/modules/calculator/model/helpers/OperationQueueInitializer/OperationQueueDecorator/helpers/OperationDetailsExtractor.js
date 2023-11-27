import {OperationProps} from "../operationDetails/constants/constants.js";
import {getFirstMatch} from "../../../../../shared/utils/regexUtils/getFirstMatch.js";

export class OperationDetailsExtractor {
    static getOperationDetailsExtractor(operationsList, operationDetails) {
        return (expression) => {
            const operationBodyRegex = operationDetails[OperationProps.BODY_REGEX](operationsList);
            const operationSignRegex = operationDetails[OperationProps.OPERATION_SIGN_REGEX](operationsList);
            const extractOperands = operationDetails[OperationProps.EXTRACT_OPERANDS];

            const operationBody = getFirstMatch(operationBodyRegex, expression);
            if(operationBody == null) return undefined;
            const operatorSign = getFirstMatch(operationSignRegex, operationBody);
            const operands = extractOperands(operatorSign, operationBody);
            const { calculateExpression } = operationsList.find(el => el.sign === operatorSign);

            return {
                operationBody,
                operatorSign,
                operands,
                calculateExpression
            }
        }
    }
}