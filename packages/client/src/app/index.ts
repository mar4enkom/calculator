import {CalculatorModel} from "../calculateExpression/mvc/model";
import {CalculatorApp} from "./CalculatorApp";
import {UserConfigModel} from "../userConfig/mvc/model";

function initCalculator(
    calculatorModel: CalculatorModel,
    userConfigModel: UserConfigModel
) {
    new CalculatorApp(calculatorModel, userConfigModel);
}

export {
    initCalculator
}