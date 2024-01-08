import {AppEvent} from "../../shared/createEvent/AppEvent";
import {CalculatorEvents} from "./types";

export const calculatorEvents: CalculatorEvents = {
    onCalculateExpression: new AppEvent(),
    onInputExpressionChange: new AppEvent()
}