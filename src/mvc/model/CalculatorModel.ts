import {Observable} from "mvc/model/helpers/Observable";
import {CalculationEvents} from "mvc/calculationEvents";
import {CalculationErrors, CalculationResult} from "shared/types/calculationResult";
import {Maybe} from "shared/types/typesUtils";

//TODO: consider making advanced generic with types for each event
export class CalculatorModel extends Observable<CalculationEvents> {
    private _result: Maybe<CalculationResult["result"]>;
    private _errors: Maybe<CalculationErrors["errors"]>;
    onCalculateExpression(inputValue: string) {
        this.notify(CalculationEvents.CALCULATE_EXPRESSION, inputValue);
    }
    getResult(): Maybe<CalculationResult["result"]> {
        return this._result;
    }
    setResult(result: CalculationResult["result"]): void {
        this._result = result;
        this._errors = undefined;
        this.notify(CalculationEvents.RESULT_UPDATED, result);
        this.notify(CalculationEvents.ERRORS_UPDATED, undefined);
    }
    getErrors(): Maybe<CalculationErrors["errors"]> {
        return this._errors;
    }
    setErrors(errors: CalculationErrors["errors"]): void {
        this._errors = errors;
        this._result = undefined;
        this.notify(CalculationEvents.ERRORS_UPDATED, errors);
        this.notify(CalculationEvents.RESULT_UPDATED, undefined);
    }
}