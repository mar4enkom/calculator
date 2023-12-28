import {CalculatorModel} from "./mvc/model";
import {CalculatorController} from "./mvc/controller";
import {ExpressionCalculator} from "./calculateExpression/ExpressionCalculator";
import CalculatorApiService from "./api/CalculatorApiService/CalculatorApiService";

export const calculatorModel = new CalculatorModel();
const expressionCalculator = new ExpressionCalculator(CalculatorApiService);

new CalculatorController(calculatorModel, expressionCalculator);