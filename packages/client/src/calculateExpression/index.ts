import {calculatorErrorVar, calculatorLoadingVar, calculatorValueVar} from "./variables";
import {onCalculateExpression} from "./events";
import CalculatorApiService from "./api/CalculatorApiService/CalculatorApiService";
import {ExpressionCalculator} from "./calculateExpression/ExpressionCalculator";
import {CalculateExpressionController} from "./controller/CalculateExpressionController";

const expressionCalculator = new ExpressionCalculator(CalculatorApiService);
const calculateExpressionController = new CalculateExpressionController({
    loading: calculatorLoadingVar,
    value: calculatorValueVar,
    error: calculatorErrorVar,
}, expressionCalculator);

onCalculateExpression.subscribe(calculateExpressionController.calculateExpressionController);

export {
    calculatorLoadingVar,
    calculatorValueVar,
    calculatorErrorVar
}
