import {ObservableVariable} from "../../shared/createEvent/ObservableVariable";
import {CalculatorVariables} from "./types";

export const calculatorVariables: CalculatorVariables = {
    value: new ObservableVariable(),
    error: new ObservableVariable(),
    loading: new ObservableVariable(false),
}