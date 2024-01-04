import {CalculatorEvents, CalculatorVariables} from "../../calculateExpression";
import {UserConfigEvents, UserConfigVariables} from "../../userConfig";

export type AppEvents = CalculatorEvents & UserConfigEvents;
export type AppVariables = CalculatorVariables & UserConfigVariables;