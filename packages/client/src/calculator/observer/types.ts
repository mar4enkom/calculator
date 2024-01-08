import {ObservableVariable} from "../../shared/createEvent/ObservableVariable";
import {ErrorObservableVariable, LoadingObservableVariable} from "../../shared/createEvent/types";
import {CalculateExpressionPayload, CalculationResult} from "@calculator/common";
import {AppEvent} from "../../shared/createEvent/AppEvent";

export type OnInputExpressionChangePayload = {
    inputValue: string;
}

export interface CalculatorEvents {
    onCalculateExpression: AppEvent<CalculateExpressionPayload>;
    onInputExpressionChange: AppEvent<OnInputExpressionChangePayload>;
}

export interface CalculatorVariables {
    loading: LoadingObservableVariable;
    error: ErrorObservableVariable;
    value: ObservableVariable<CalculationResult | undefined>;
}