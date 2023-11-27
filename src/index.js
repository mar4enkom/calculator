import {CalculateExpressionService} from "./modules/calculator/model/index.js";
import {CalculateExpressionController} from "./modules/calculator/controller/index.js";
import {CalculateExpressionView} from "./modules/calculator/view/index.js";

import {operationsConfig} from "../userConfig/index.js";
import {CalculationEvents} from "./modules/calculator/shared/constants.js";

import "./styles/variables.css";
import "./styles/bootstrap.min.css";
import "./styles/globals.css";
import "./styles/bootstrap-overrides.css";

function initCalculator() {
    const calculateExpressionModel = new CalculateExpressionService(operationsConfig);
    const calculationController = new CalculateExpressionController(calculateExpressionModel);
    const calculationView = new CalculateExpressionView(calculateExpressionModel, operationsConfig);

    calculationView.render();
}

initCalculator();