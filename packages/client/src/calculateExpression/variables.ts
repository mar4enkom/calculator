import {ObservableVariable} from "../shared/createEvent/ObservableVariable";
import {CalculationResult} from "@calculator/common";
import {ServerMultiError} from "../shared/helpers/ServerMultiError";
import {CalculatorVariables} from "./types";

export const calculatorLoadingVar = new ObservableVariable<boolean>(false);
export const calculatorValueVar = new ObservableVariable<CalculationResult | undefined>();
export const calculatorErrorVar = new ObservableVariable<ServerMultiError | undefined>();
