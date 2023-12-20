import {CalculatorView} from "mvc/view";
import {CalculatorModel} from "mvc/model";
import {CalculatorController} from "mvc/controller";
import {CalculatorViewService, Singleton, Types} from "@calculator/common";
import {CalculatorApiService} from "api/types";
import {ExpressionCalculator} from "../calculateExpression/types";

function initCalculator(
    expressionCalculator: ExpressionCalculator,
    calculationViewService: CalculatorViewService,
    operationsConfig: Types
) {
    const calculatorModel = new CalculatorModel();
    new CalculatorController(calculatorModel, expressionCalculator);
    const calculatorView = new CalculatorView(calculationViewService, calculatorModel, operationsConfig);

    calculatorView.render();
}

export {
    initCalculator
}