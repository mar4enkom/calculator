import {AppEvent} from "../../shared/createEvent/AppEvent";
import {CalculateExpressionPayload} from "@calculator/common";
import {CalculatorEvents} from "./types";

export const calculatorEvents: CalculatorEvents = {
    onCalculateExpression: new AppEvent()
}