import {CalculatorModel} from "../calculateExpression/mvc/model";
import {CalculatorApp} from "./CalculatorApp";

function initCalculator(
    calculatorModel: CalculatorModel,
) {
    new CalculatorApp(calculatorModel);
}

export {
    initCalculator
}