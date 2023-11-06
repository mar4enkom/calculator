import {CalculateExpressionService} from "./modules/calculator/model/index.js";
import {CalculateExpressionController} from "./modules/calculator/controller/index.js";
import {CalculateExpressionView} from "./modules/calculator/view/index.js";

import {operationsConfig} from "../userConfig/operations/index.js";
import {ObservableType} from "./modules/calculator/shared/constants.js";

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