import {ObservableVariable} from "../../../shared/helpers/model/ObservableVariable";
import {CalculatorVariables} from "./types";

export const calculatorVariables: CalculatorVariables = {
    value: new ObservableVariable(),
    error: new ObservableVariable(),
    loading: new ObservableVariable(false),
}