import {Observable} from "mvc/model/helpers/Observable";
import {CalculationErrors, CalculationResult} from "@calculator/common";
import {Maybe} from "@calculator/common";

interface IMvcObservable {
    calculateExpression: string;
    resultUpdated: Maybe<CalculationResult["result"]>;
    errorsUpdated: Maybe<CalculationErrors["errors"]>;
}

export class CalculatorModel extends Observable<IMvcObservable> {
    private _result: Maybe<CalculationResult["result"]>;
    private _errors: Maybe<CalculationErrors["errors"]>;
    onCalculateExpression(inputValue: string): void {
        this.notify("calculateExpression", inputValue);
    }
    getResult(): Maybe<CalculationResult["result"]> {
        return this._result;
    }
    setResult(result: CalculationResult["result"]): void {
        this._result = result;
        this._errors = undefined;
        this.notify("resultUpdated", result);
        this.notify("errorsUpdated", undefined);
    }
    getErrors(): Maybe<CalculationErrors["errors"]> {
        return this._errors;
    }
    setErrors(errors: CalculationErrors["errors"]): void {
        this._errors = errors;
        this._result = undefined;
        this.notify("errorsUpdated", errors);
        this.notify("resultUpdated", undefined);
    }
}