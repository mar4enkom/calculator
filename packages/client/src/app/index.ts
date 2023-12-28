import {CalculatorModel} from "../calculateExpression/mvc/model";
import {CalculatorApp} from "./CalculatorApp";
import {CalculatorViewService} from "viewService/CalculatorViewService/CalculatorViewService";
import {UserConfigModel} from "../userConfig/mvc/model";

function initCalculator(
    calculatorModel: CalculatorModel,
    calculationViewService: typeof CalculatorViewService,
    userConfigModel: UserConfigModel
) {
    new CalculatorApp(calculationViewService, calculatorModel, userConfigModel);
}

export {
    initCalculator
}