import {CalculationErrors} from "../constants/errors.js";
import {CalculationErrorCodes} from "../constants/errorCodes.js";

export class CalculationError {
    constructor(errors = CalculationErrors[CalculationErrorCodes.INVALID_EXPRESSION_INPUT_ERROR]) {
        this.errors = Array.isArray(errors) ? errors : [errors]
    }
}