import {CalculatorView} from "mvc/view";
import {CalculatorModel} from "mvc/model";
import {CalculatorController} from "mvc/controller";
import {ICalculatorViewService, IExpressionCalculator} from "@calculator/common";
import {UserConfig} from "userConfig/operations/types";

function initCalculator(
    calculationService: IExpressionCalculator,
    calculationViewService: ICalculatorViewService,
    operationsConfig: UserConfig
) {
    const calculatorModel = new CalculatorModel();
    const calculatorController = new CalculatorController(calculatorModel, calculationService);
    const calculatorView = new CalculatorView(calculationViewService, calculatorModel, operationsConfig);

    calculatorView.render();
}

export {
    initCalculator
}