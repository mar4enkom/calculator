import {ObservableVariable} from "../../shared/createEvent/ObservableVariable";
import {CalculatorVariables} from "./types";

export const calculatorVariables: CalculatorVariables = {
    calculatorValue: new ObservableVariable(),
    calculatorError: new ObservableVariable(),
    calculatorLoading: new ObservableVariable(false),
}