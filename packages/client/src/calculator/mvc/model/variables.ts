import {CalculatorVariables} from "@/calculator";
import {ObservableVariable} from "@/shared/helpers/model/ObservableVariable";

export const calculatorVariables: CalculatorVariables = {
    value: new ObservableVariable(),
    error: new ObservableVariable(),
    loading: new ObservableVariable(false),
}