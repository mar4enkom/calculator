import {Observable} from "mvc/model/helpers/Observable";
import {CalculationErrors, CalculationResult} from "@calculator/common";
import {Maybe} from "@calculator/common";
import {Events} from "mvc/events";

interface MvcObservable {
    calculateExpression: string;
    resultUpdated: Maybe<CalculationResult["result"]>;
    errorsUpdated: Maybe<CalculationErrors["errors"]>;
}

export class CalculatorModel extends Observable<MvcObservable> {
    private _result: Maybe<CalculationResult["result"]>;
    private _errors: Maybe<CalculationErrors["errors"]>;
    onCalculateExpression(inputValue: string): void {
        this.notify(Events.CALCULATE_EXPRESSION, inputValue);
    }
    getResult(): Maybe<CalculationResult["result"]> {
        return this._result;
    }
    setResult(result: CalculationResult["result"]): void {
        this._result = result;
        this._errors = undefined;
        this.notify(Events.RESULT_UPDATED, result);
        this.notify(Events.ERRORS_UPDATED, undefined);
    }
    getErrors(): Maybe<CalculationErrors["errors"]> {
        return this._errors;
    }
    setErrors(errors: CalculationErrors["errors"]): void {
        this._errors = errors;
        this._result = undefined;
        this.notify(Events.ERRORS_UPDATED, errors);
        this.notify(Events.RESULT_UPDATED, undefined);
    }
}