import {CalculatorView} from "mvc/view";
import {CalculatorModel} from "mvc/model";
import {CalculatorController} from "mvc/controller";
import {UserConfig} from "@calculator/common";
import {ExpressionCalculator} from "../calculateExpression/types";
import {CalculatorViewService} from "viewService/types";

function initCalculator(
    expressionCalculator: ExpressionCalculator,
    calculationViewService: CalculatorViewService,
    operationsConfig: UserConfig
) {
    const calculatorModel = new CalculatorModel();
    new CalculatorController(calculatorModel, expressionCalculator);
    const calculatorView = new CalculatorView(calculationViewService, calculatorModel, operationsConfig);

    calculatorView.render();
}

export {
    initCalculator
}