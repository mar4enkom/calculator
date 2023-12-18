import {CalculatorView} from "mvc/view/index";
import {CalculatorModel} from "mvc/model/index";
import {CalculatorController} from "mvc/controller/index";
import {CalculatorViewService, CalculatorService} from "shared/types/types";
import {UserConfig} from "userConfig/operations/types";

function initCalculator(
    calculationService: CalculatorService,
    calculationViewService: CalculatorViewService,
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