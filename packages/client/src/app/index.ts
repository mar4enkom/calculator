import {CalculatorApp} from "./CalculatorApp";
import {calculatorEvents, CalculatorEvents, calculatorVariables, CalculatorVariables} from "../calculateExpression";
import {userConfigEvents, UserConfigEvents, userConfigVariables, UserConfigVariables} from "../userConfig";

export type AppEvents = CalculatorEvents & UserConfigEvents;
export type AppVariables = CalculatorVariables & UserConfigVariables;

function initCalculator() {
    const variables: AppVariables = {
        ...userConfigVariables,
        ...calculatorVariables
    };
    const events: AppEvents = {
        ...userConfigEvents,
        ...calculatorEvents
    }

    new CalculatorApp(events, variables);
}

export {
    initCalculator
}