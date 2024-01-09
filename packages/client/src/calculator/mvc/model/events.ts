import {CalculatorEvents} from "@/calculator";
import {AppEvent} from "@/shared/helpers/model/AppEvent";


export const calculatorEvents: CalculatorEvents = {
    onCalculateExpression: new AppEvent(),
    onInputExpressionChange: new AppEvent()
}