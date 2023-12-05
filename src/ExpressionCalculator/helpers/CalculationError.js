import {CalculationErrors} from "CalculatorService/constants/errors.js";
import {CalculationErrorCodes} from "CalculatorService/constants/errorCodes.js";

export class CalculationError {
    constructor(errors = CalculationErrors[CalculationErrorCodes.INVALID_EXPRESSION_INPUT]) {
        this.errors = Array.isArray(errors) ? errors : [errors]
    }
}