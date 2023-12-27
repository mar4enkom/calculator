import {CalculatorView} from "mvc/view";
import {CalculatorModel} from "mvc/model";
import {CalculatorController} from "mvc/controller";
import {OperationsConfig} from "@calculator/common";
import {ExpressionCalculator} from "../calculateExpression/types";
import {CalculatorViewService} from "viewService/types";

function initCalculator(
    expressionCalculator: ExpressionCalculator,
    calculationViewService: CalculatorViewService,
    operationsConfig: OperationsConfig
) {
    const calculatorModel = new CalculatorModel();
    new CalculatorController(calculatorModel, expressionCalculator);
    const calculatorView = new CalculatorView(calculationViewService, calculatorModel, operationsConfig);

    calculatorView.render();
}

export {
    initCalculator
}