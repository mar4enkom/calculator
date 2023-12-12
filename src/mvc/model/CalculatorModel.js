import {Observable} from "mvc/model/helpers/Observable.js";
import {operationsConfig} from "userConfig/index.js";
import {CalculationEvents} from "mvc/calculationEvents.js";

export class CalculatorModel extends Observable {
    #result;
    #errors;
    onCalculateExpression(inputValue) {
        this.notify(CalculationEvents.CALCULATE_EXPRESSION, inputValue);
    }
    getResult() {
        return this.#result;
    }
    setResult(result) {
        this.#result = result;
        this.#errors = undefined;
        this.notify(CalculationEvents.RESULT_UPDATED, result);
        this.notify(CalculationEvents.ERRORS_UPDATED, undefined);
    }
    getErrors() {
        return this.#errors;
    }
    setErrors(errors) {
        this.#errors = errors;
        this.#result = undefined;
        this.notify(CalculationEvents.ERRORS_UPDATED, errors);
        this.notify(CalculationEvents.RESULT_UPDATED, undefined);
    }
}