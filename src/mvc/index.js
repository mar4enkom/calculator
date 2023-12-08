import {CalculatorView} from "Mvc/view/index.js";
import {CalculatorModel} from "Mvc/model/index.js";
import {CalculatorController} from "Mvc/controller/index.js";

function initCalculator(calculationService, calculationViewService, operationsConfig) {
    const calculatorModel = new CalculatorModel();
    const calculatorController = new CalculatorController(calculatorModel, calculationService);
    const calculatorView = new CalculatorView(calculationViewService, calculatorModel, operationsConfig);

    calculatorView.render();
}

export {
    initCalculator
}