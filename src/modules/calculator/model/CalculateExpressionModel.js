import {Observable} from "./helpers/Observable.js";
import {CalculationEvents} from "../shared/constants/constants.js";

export class CalculateExpressionModel extends Observable {
    #result;
    #errors;
    calculateExpression(inputValue) {
        this.notify(CalculationEvents.CALCULATE_EXPRESSION, inputValue);
    }
    get result() {
        return this.#result;
    }
    set result(result) {
        this.#result = result;
        this.#errors = undefined;
        this.notify(CalculationEvents.RESULT_UPDATED, result);
        this.notify(CalculationEvents.ERRORS_UPDATED, undefined);
    }
    get errors() {
        return this.#errors;
    }
    set errors(errors) {
        this.#errors = errors;
        this.#result = undefined;
        this.notify(CalculationEvents.ERRORS_UPDATED, errors);
        this.notify(CalculationEvents.RESULT_UPDATED, undefined);
    }
}