import {CalculatorModel} from "../calculateExpression/mvc/model";
import {CalculatorViewService} from "viewService/types";
import {CalculatorApp} from "./CalculatorApp";

function initCalculator(
    calculatorModel: CalculatorModel,
    calculationViewService: CalculatorViewService,
) {
    const app = new CalculatorApp(calculationViewService, calculatorModel);

    app.render();
}

export {
    initCalculator
}