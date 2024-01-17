import {ObservableVariable} from "@/shared/helpers/model/ObservableVariable";
import {VariableError} from "@/shared/helpers/model/types";
import {CalculationResult} from "@calculator/common";

export type OnInputExpressionChangePayload = {
    inputValue: string;
}

export const calculatorVariables = {
    value: new ObservableVariable<CalculationResult | undefined>(),
    error: new ObservableVariable<VariableError>(),
    loading: new ObservableVariable<boolean>(false),
}