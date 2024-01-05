import {ObservableVariable} from "../../shared/createEvent/ObservableVariable";
import {ErrorObservableVariable, LoadingObservableVariable} from "../../shared/createEvent/types";
import {AppError} from "../../shared/helpers/AppError";
import {CalculateExpressionPayload, CalculationResult} from "@calculator/common";
import {AppEvent} from "../../shared/createEvent/AppEvent";

export interface CalculatorEvents {
    onCalculateExpression: AppEvent<CalculateExpressionPayload>;
}

export interface CalculatorVariables {
    calculatorLoading: LoadingObservableVariable;
    calculatorError: ErrorObservableVariable;
    calculatorValue: ObservableVariable<CalculationResult | undefined>;
}