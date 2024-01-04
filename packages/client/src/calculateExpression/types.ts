import {calculatorErrorVar, calculatorLoadingVar, calculatorValueVar} from "./variables";
import {onCalculateExpression} from "./events";

export interface CalculatorEvents {
    onCalculateExpression: typeof onCalculateExpression;
}

export interface CalculatorVariables {
    loading: typeof calculatorLoadingVar;
    error: typeof calculatorErrorVar;
    value: typeof calculatorValueVar;
}