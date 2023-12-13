import {Observable} from "mvc/model/helpers/Observable";
import {CalculationEvent} from "mvc/calculationEvent";
import {CalculationErrors, CalculationResult} from "shared/types/calculationResult";
import {Maybe} from "shared/types/typesUtils";

//TODO: consider making advanced generic with types for each event
export class CalculatorModel extends Observable<CalculationEvent> {
    private _result: Maybe<CalculationResult["result"]>;
    private _errors: Maybe<CalculationErrors["errors"]>;
    onCalculateExpression(inputValue: string) {
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