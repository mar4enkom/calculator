import {CalculateExpressionView} from "./modules/calculator/view/CalculateExpressionView.js";
import {CalculateExpressionController} from "./modules/calculator/controller/CalculateExpressionController.js";
import {CalculateExpressionService, ObservableType} from "./modules/calculator/model/CalculateExpressionService.js";
import {operationsConfig} from "../userConfig/operations/index.js";
import {Config} from "./modules/calculator/model/configInitializer/Config.js";

import "./styles/bootstrap.min.css";
import "./styles/globals.css";
import "./styles/bootstrap-overrides.css";

function initCalculator() {
    const calculateExpressionModel = new CalculateExpressionService(operationsConfig);
    const calculationController = new CalculateExpressionController(calculateExpressionModel);
    const calculationView = new CalculateExpressionView(calculationController, operationsConfig);

    //Q: best place to init subscriptions?
    calculateExpressionModel.subscribe(ObservableType.CALCULATION_RESULT, calculationView.renderResult.bind(calculationView));
    calculateExpressionModel.subscribe(ObservableType.VALIDATION_ERROR, calculationView.renderValidationErrors.bind(calculationView));

    calculationView.render();
}

initCalculator();