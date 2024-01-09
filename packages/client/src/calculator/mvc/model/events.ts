import {AppEvent} from "../../../shared/helpers/model/AppEvent";
import {CalculatorEvents} from "./types";

export const calculatorEvents: CalculatorEvents = {
    onCalculateExpression: new AppEvent(),
    onInputExpressionChange: new AppEvent()
}