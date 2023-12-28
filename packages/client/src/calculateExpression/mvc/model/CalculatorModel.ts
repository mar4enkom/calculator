import {Observable} from "./helpers/Observable";
import {CalculationResult, ErrorBody, Maybe, UserConfigResponseBody} from "@calculator/common";
import {CalculateEvents} from "../calculateEvents";

interface MvcObservable {
    calculateExpression: string;
    resultUpdated: CalculationResult;
    errorsUpdated: Maybe<ErrorBody>;
    userConfigUpdated: Maybe<UserConfigResponseBody>
    loadingUpdated: boolean;
}

export class CalculatorModel extends Observable<MvcObservable> {
    //TODO: set default values in constructor
    private _result: Maybe<CalculationResult>;
    private _errors: Maybe<ErrorBody>;
    private _loading: Maybe<boolean>;
    onCalculateExpression(inputValue: string): void {
        this.notify(CalculateEvents.CALCULATE_EXPRESSION, inputValue);
    }
    getResult(): Maybe<CalculationResult> {
        return this._result;
    }
    setResult(result: CalculationResult): void {
        this._result = result;
        this._errors = undefined;
        this.notify(CalculateEvents.RESULT_UPDATED, result);
        this.notify(CalculateEvents.ERRORS_UPDATED, undefined);
    }
    getErrors(): Maybe<ErrorBody> {
        return this._errors;
    }
    setErrors(errors: ErrorBody): void {
        this._errors = errors;
        this._result = undefined;
        this.notify(CalculateEvents.ERRORS_UPDATED, errors);
        this.notify(CalculateEvents.RESULT_UPDATED, null);
    }
    getIsLoading(): Maybe<boolean> {
        return this._loading;
    }
    setIsLoading(isLoading: boolean): void {
        this._loading = isLoading;
        this.notify(CalculateEvents.LOADING_UPDATED, isLoading);
    }
}