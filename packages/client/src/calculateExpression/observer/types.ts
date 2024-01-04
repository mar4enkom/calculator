import {ObservableVariable} from "../../shared/createEvent/ObservableVariable";
import {LoadingObservableVariable} from "../../shared/createEvent/types";
import {ServerMultiError} from "../../shared/helpers/ServerMultiError";
import {CalculateExpressionPayload, CalculationResult} from "@calculator/common";
import {AppEvent} from "../../shared/createEvent/AppEvent";

export interface CalculatorEvents {
    onCalculateExpression: AppEvent<CalculateExpressionPayload>;
}

export interface CalculatorVariables {
    calculatorLoading: LoadingObservableVariable;
    calculatorError: ObservableVariable<ServerMultiError | undefined>;
    calculatorValue: ObservableVariable<CalculationResult | undefined>;
}