import {OperationErrorCodes} from "../../../constants/errorCodes.js";
import {stringIsNumber} from "../../../utils/stringIsNumber.js";

export class OperationValidationProvider {
    constructor(operationProps) {
        this.operationProps = operationProps;
    }

    getDefaultValidations() {
        return [
            {
                validate: (...args) => args.length === this.operationProps.calculateExpression.length,
                message: `Invalid number of arguments in "${this.operationProps.name}" operation`,
                code: OperationErrorCodes.NUMBER_OF_ARGUMENTS,
            }
        ]
    }

    getCustomValidations() {
        return [
            {
                validate: (...args) => {
                    if(args.some(el => !stringIsNumber(el))) return true;
                    return args.every(a => +a >= 0)
                },
                message: `Arguments of "${this.operationProps.name}" operation must be positive`,
                code: OperationErrorCodes.NON_NEGATIVE_ARGUMENTS
            },
            {
                validate: (...args) => {
                    return args[1] !== 0;
                },
                message: `Division by zero is not allowed`,
                code: OperationErrorCodes.ZERO_DIVISION
            }
        ]
    }
}