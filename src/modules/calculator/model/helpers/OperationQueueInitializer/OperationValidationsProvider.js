import {OperationErrorCodes} from "../../constants/errorCodes.js";
import {stringIsNumber} from "../../utils/stringIsNumber.js";

export class ValidationsProvider {
    constructor(operationProps) {
        this.operationProps = operationProps;
        this.defaultValidations = [
            {
                validate: (...args) => args.length === this.operationProps.calc.length,
                message: `Invalid number of arguments in "${this.operationProps.name}" operation`,
                code: OperationErrorCodes.NUMBER_OF_ARGUMENTS,
            }
        ];

        this.customValidations = [
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

    get() {
        return [
            ...this.defaultValidations,
            ...this.#getMatchedCustomValidations(this.operationProps),
        ]
    }

    #getMatchedCustomValidations(operationProps) {
        if(!operationProps.validations) return [];

        const operationValidations = Object.keys(operationProps.validations);
        return operationValidations.reduce((acc, validationName) => {
            const validationProps = this.customValidations.find(v => v.code === validationName);
            if(validationProps) return [...acc, validationProps];
            throw new Error(`Unknown validation ${validationName} for "${operationProps.name}" operation`);
        }, []);
    }
}
