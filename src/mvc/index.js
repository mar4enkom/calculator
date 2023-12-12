import {CalculatorView} from "mvc/view/index.ts";
import {CalculatorModel} from "mvc/model/index.ts";
import {CalculatorController} from "mvc/controller/index.ts";

function initCalculator(calculationService, calculationViewService, operationsConfig) {
    const calculatorModel = new CalculatorModel();
    const calculatorController = new CalculatorController(calculatorModel, calculationService);
    const calculatorView = new CalculatorView(calculationViewService, calculatorModel, operationsConfig);

    calculatorView.render();
}

export {
    initCalculator
}