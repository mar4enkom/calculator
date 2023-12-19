import {CalculatorView} from "mvc/view";
import {CalculatorModel} from "mvc/model";
import {CalculatorController} from "mvc/controller";
import {CalculatorViewService, UserConfig} from "@calculator/common";
import {CalculatorApiService} from "api/types";

function initCalculator(
    calculationService: CalculatorApiService,
    calculationViewService: CalculatorViewService,
    operationsConfig: UserConfig
) {
    const calculatorModel = new CalculatorModel();
    new CalculatorController(calculatorModel, calculationService);
    const calculatorView = new CalculatorView(calculationViewService, calculatorModel, operationsConfig);

    calculatorView.render();
}

export {
    initCalculator
}