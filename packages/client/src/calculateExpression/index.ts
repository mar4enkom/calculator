import {CalculatorModel} from "./mvc/model";
import {CalculatorController} from "./mvc/controller";
import {ExpressionCalculator} from "./calculateExpression/ExpressionCalculator";
import CalculatorApiService from "./api/CalculatorApiService/CalculatorApiService";

export const calculatorModel = new CalculatorModel();
const expressionCalculator = new ExpressionCalculator(CalculatorApiService);

//TODO: develop es-lint rule to require controller init in index.ts file of module
new CalculatorController(calculatorModel, expressionCalculator);