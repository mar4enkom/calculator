import {Observable} from "mvc/model/helpers/Observable";
import {ErrorBody, Maybe} from "@calculator/common";
import {Events} from "mvc/events";
import {CalculationResult} from "api/types";


interface MvcObservable {
    calculateExpression: string;
    resultUpdated: CalculationResult;
    errorsUpdated: Maybe<ErrorBody>;
}

export class CalculatorModel extends Observable<MvcObservable> {
    private _result: Maybe<CalculationResult>;
    private _errors: Maybe<ErrorBody>;
    onCalculateExpression(inputValue: string): void {
        this.notify(Events.CALCULATE_EXPRESSION, inputValue);
    }
    getResult(): Maybe<CalculationResult> {
        return this._result;
    }
    setResult(result: CalculationResult): void {
        this._result = result;
        this._errors = undefined;
        this.notify(Events.RESULT_UPDATED, result);
        this.notify(Events.ERRORS_UPDATED, undefined);
    }
    getErrors(): Maybe<ErrorBody> {
        return this._errors;
    }
    setErrors(errors: ErrorBody): void {
        this._errors = errors;
        this._result = undefined;
        this.notify(Events.ERRORS_UPDATED, errors);
        this.notify(Events.RESULT_UPDATED, null);
    }
}