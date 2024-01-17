import {AppEvent} from "@/shared/helpers/model/AppEvent";
import {CalculateExpressionPayload} from "@calculator/common";
import {OnInputExpressionChangePayload} from "@/calculator/mvc/model/variables";


export const calculatorEvents = {
    onCalculateExpression: new AppEvent<CalculateExpressionPayload>(),
    onInputExpressionChange: new AppEvent<OnInputExpressionChangePayload>()
}