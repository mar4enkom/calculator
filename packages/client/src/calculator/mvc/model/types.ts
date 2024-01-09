import {AppEvent} from "@/shared/helpers/model/AppEvent";
import {CalculateExpressionPayload, CalculationResult} from "@calculator/common";
import {ErrorObservableVariable, LoadingObservableVariable} from "@/shared/helpers/model/types";
import {ObservableVariable} from "@/shared/helpers/model/ObservableVariable";

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