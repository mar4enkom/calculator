import {ExpressionCalculator} from "./calculateExpression/ExpressionCalculator";
import CalculatorApiService from "./api/CalculatorApiService/CalculatorApiService";
import {CalculateExpressionController} from "./controller/CalculateExpressionController";
import {calculatorVariables} from "./observer/variables";
import {calculatorEvents} from "./observer/events";

export function initModule() {
    const expressionCalculator = new ExpressionCalculator(CalculatorApiService);
    const calculateExpressionController = new CalculateExpressionController(calculatorVariables, expressionCalculator);

    calculatorEvents.onCalculateExpression.subscribe(calculateExpressionController.calculateExpressionController);
}