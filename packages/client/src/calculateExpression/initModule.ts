import CalculatorApiService from "./api/CalculatorApiService/CalculatorApiService";
import {CalculateExpressionController} from "./controller/CalculateExpressionController";
import {calculatorVariables} from "./observer/variables";
import {calculatorEvents} from "./observer/events";

export function initModule() {
    const calculateExpressionController = new CalculateExpressionController(calculatorVariables, CalculatorApiService);

    calculatorEvents.onCalculateExpression.subscribe(calculateExpressionController.calculateExpressionController);
}